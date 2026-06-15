import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const ADMIT_CARD_URL =
  "https://examinationservices.nic.in/AdmitCardService/AcNeet/Login";
const ADMIT_CARD_LINK =
  `[[Download Admit Card Here | ${ADMIT_CARD_URL}]]`;
const BLOG_METADATA_PREFIX = "<!-- BLOG_METADATA:";

function loadEnvFile(fileName) {
  const envPath = path.join(process.cwd(), fileName);

  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const rawValue = trimmed.slice(index + 1).trim();

    if (!key || process.env[key] !== undefined) {
      continue;
    }

    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const prisma = new PrismaClient();

function haystack(blog) {
  return `${blog.title} ${blog.slug} ${blog.category ?? ""}`.toLowerCase();
}

function isReNeetAdmitCardBlog(blog) {
  const text = haystack(blog);

  return (
    text.includes("re-neet") ||
    (text.includes("re-exam") && text.includes("admit card")) ||
    (text.includes("neet ug 2026") && text.includes("admit card")) ||
    (text.includes("neet") && text.includes("admit card") && text.includes("2026"))
  );
}

function addAdmitCardLink(content) {
  if (content.includes(ADMIT_CARD_LINK)) {
    return content;
  }

  const line = `For RE-NEET admit card download, ${ADMIT_CARD_LINK}.`;
  const markerIndex = content.lastIndexOf(BLOG_METADATA_PREFIX);

  if (markerIndex === -1) {
    return `${content.trimEnd()}\n\n${line}`;
  }

  const beforeMetadata = content.slice(0, markerIndex).trimEnd();
  const metadata = content.slice(markerIndex);

  return `${beforeMetadata}\n\n${line}\n\n${metadata}`;
}

const tickerRules = [
  {
    tickerText: "RE-NEET Admit Card",
    tickerOrder: 1,
    match: isReNeetAdmitCardBlog,
    ensureAdmitCardLink: true,
  },
  {
    tickerText: "Vijay NEET Debate",
    tickerOrder: 2,
    match: (blog) => {
      const text = haystack(blog);

      return text.includes("vijay") && text.includes("neet");
    },
  },
  {
    tickerText: "MBBS India Guide",
    tickerOrder: 3,
    match: (blog) => {
      const text = haystack(blog);

      return text.includes("mbbs india") && text.includes("admission");
    },
  },
  {
    tickerText: "Bangladesh MBBS Update",
    tickerOrder: 4,
    match: (blog) => haystack(blog).includes("bangladesh"),
  },
  {
    tickerText: "Kyrgyzstan MBBS 2026",
    tickerOrder: 5,
    match: (blog) => haystack(blog).includes("kyrgyzstan"),
  },
  {
    tickerText: "Scholarship Loan Help",
    tickerOrder: 6,
    match: (blog) => {
      const text = haystack(blog);

      return text.includes("scholarship") || text.includes("loan");
    },
  },
  {
    tickerText: "FMGE Result Data",
    tickerOrder: 7,
    match: (blog) => {
      const text = haystack(blog);

      return text.includes("fmge") && (text.includes("result") || text.includes("data"));
    },
  },
];

async function main() {
  const blogs = await prisma.blog.findMany({
    where: {
      status: "published",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      content: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const selectedIds = new Set();
  const updates = [];

  for (const rule of tickerRules) {
    const blog = blogs.find((item) => !selectedIds.has(item.id) && rule.match(item));

    if (!blog) {
      continue;
    }

    selectedIds.add(blog.id);
    updates.push({ blog, rule });
  }

  for (const { blog, rule } of updates) {
    const data = {
      showInTicker: true,
      tickerText: rule.tickerText,
      tickerOrder: rule.tickerOrder,
    };

    if (rule.ensureAdmitCardLink) {
      data.content = addAdmitCardLink(blog.content);
    }

    await prisma.blog.update({
      where: {
        id: blog.id,
      },
      data,
    });

    console.log(
      `Updated ticker: order ${rule.tickerOrder} | ${rule.tickerText} | ${blog.title}`
    );
  }

  if (updates.length === 0) {
    console.log("No matching published blogs found for ticker backfill.");
  }
}

main()
  .catch((error) => {
    console.error("Ticker backfill failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
