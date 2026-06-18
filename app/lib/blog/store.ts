import { cache } from "react";
import { prisma } from "../prisma";
import { promises as fs } from "fs";
import path from "path";
import { seedDatabase } from "./seed";

import type {
  BlogCategory,
  BlogComment,
  BlogDatabase,
  BlogPost,
  BlogRole,
  BlogSort,
  BlogSummaryPost,
  BlogTickerPost,
  BlogUser,
} from "./types";

export const BLOG_ADMIN_EMAIL =
  "injamulhoquemiddya@gmail.com";

const BLOG_EDITOR_EMAIL =
  "middya@ilmalink.com";

const databasePath = path.join(
  process.cwd(),
  "data",
  "blog-db.json"
);

type PrismaBlogRecord = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  category: string;
  country: string;
  featuredImage: string | null;
  tickerText?: string | null;
  showInTicker?: boolean | null;
  tickerOrder?: number | null;
  status: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author?: {
    name: string;
  } | null;
};

type PrismaBlogCommentRecord = {
  id: string;
  blogId: string;
  authorName: string;
  message: string;
  status: string;
  createdAt: Date;
};

type PrismaBlogCommentModel = {
  findMany: (args: {
    orderBy: {
      createdAt: "desc";
    };
  }) => Promise<PrismaBlogCommentRecord[]>;
  create: (args: {
    data: {
      id: string;
      blogId: string;
      authorName: string;
      message: string;
      status: string;
      createdAt: Date;
    };
    select: {
      id: true;
    };
  }) => Promise<{ id: string }>;
};

type StoredBlogMetadata = {
  imageAlt?: string;
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  tags?: string[];
  readTime?: string;
  publishDate?: string;
  images?: BlogPost["images"];
};

const BLOG_METADATA_PREFIX =
  "<!-- BLOG_METADATA:";
const BLOG_METADATA_SUFFIX = " -->";
const MAX_SLUG_LENGTH = 180;
const DEFAULT_TICKER_ORDER = 999;

function normalizeTickerText(
  value: unknown
) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim().slice(0, 100);

  return trimmed || null;
}

function normalizeTickerOrder(
  value: unknown
) {
  const order =
    typeof value === "number"
      ? value
      : Number.parseInt(String(value ?? ""), 10);

  return Number.isFinite(order) && order > 0
    ? order
    : DEFAULT_TICKER_ORDER;
}

function normalizeBlogPost(
  blog: BlogPost
): BlogPost {
  return {
    ...blog,
    createdAt:
      blog.createdAt ??
      blog.publishDate ??
      blog.updatedAt,
    tickerText: normalizeTickerText(
      blog.tickerText
    ),
    showInTicker: blog.showInTicker ?? false,
    tickerOrder: normalizeTickerOrder(
      blog.tickerOrder
    ),
  };
}

function normalizeBlogDatabase(
  database: BlogDatabase
): BlogDatabase {
  return {
    ...database,
    blogs: database.blogs.map(normalizeBlogPost),
    drafts: database.drafts.map(normalizeBlogPost),
    comments: database.comments ?? [],
    views: database.views ?? [],
  };
}

function getPrismaBlogCommentModel() {
  return (
    prisma as unknown as {
      blogComment?: PrismaBlogCommentModel;
    }
  ).blogComment;
}

function isRole(value: string): value is BlogRole {
  return (
    value === "admin" ||
    value === "editor" ||
    value === "author"
  );
}

export function getEffectiveBlogRole(
  email: string,
  role: string
): BlogRole {
  const normalizedEmail = email
    .trim()
    .toLowerCase();

  if (normalizedEmail === BLOG_ADMIN_EMAIL) {
    return "admin";
  }

  if (normalizedEmail === BLOG_EDITOR_EMAIL) {
    return role === "admin" ? "admin" : "editor";
  }

  return isRole(role) ? role : "author";
}

async function withEffectiveBlogRole<
  T extends { id: string; email: string; role: string },
>(user: T | null) {
  if (!user) {
    return null;
  }

  const role = getEffectiveBlogRole(
    user.email,
    user.role
  );

  if (role !== user.role) {
    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          role,
        },
      });
    } catch (error) {
      console.log(
        "Blog role sync error:",
        error
      );
    }
  }

  return {
    ...user,
    role,
  };
}

async function readFileDatabase(): Promise<BlogDatabase> {
  try {
    const file = await fs.readFile(databasePath, "utf8");

    return normalizeBlogDatabase(
      JSON.parse(file) as BlogDatabase
    );
  } catch {
    return normalizeBlogDatabase(seedDatabase);
  }
}

function stringifyBlogMetadata(
  blog: BlogPost
) {
  const metadata: StoredBlogMetadata = {
    imageAlt: blog.imageAlt,
    seoTitle: blog.seoTitle,
    metaDescription: blog.metaDescription,
    keywords: blog.keywords,
    tags: blog.tags,
    readTime: blog.readTime,
    publishDate: blog.publishDate,
    images: blog.images ?? [],
  };

  return JSON.stringify(metadata);
}

function splitBlogContent(value: string) {
  const markerIndex = value.lastIndexOf(
    BLOG_METADATA_PREFIX
  );

  if (markerIndex === -1) {
    return {
      content: value,
      metadata: {} as StoredBlogMetadata,
    };
  }

  const markerEnd = value.indexOf(
    BLOG_METADATA_SUFFIX,
    markerIndex
  );

  if (markerEnd === -1) {
    return {
      content: value,
      metadata: {} as StoredBlogMetadata,
    };
  }

  const encoded = value.slice(
    markerIndex + BLOG_METADATA_PREFIX.length,
    markerEnd
  );

  try {
    const metadata = JSON.parse(
      Buffer.from(encoded, "base64").toString("utf8")
    ) as StoredBlogMetadata;

    return {
      content: value.slice(0, markerIndex).trimEnd(),
      metadata,
    };
  } catch {
    return {
      content: value,
      metadata: {} as StoredBlogMetadata,
    };
  }
}

function joinBlogContent(
  content: string,
  metadata: string
) {
  const encoded = Buffer.from(metadata, "utf8").toString(
    "base64"
  );

  return `${content.trimEnd()}\n\n${BLOG_METADATA_PREFIX}${encoded}${BLOG_METADATA_SUFFIX}`;
}

function toBlogCategory(value: string): BlogCategory {
  const category = value.trim();

  return category || "MBBS India";
}

function toBlogStatus(value: string) {
  return value === "published" ||
    value === "pending" ||
    value === "rejected"
    ? value
    : "draft";
}

function safeDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? new Date()
    : date;
}

function mapPrismaBlog(
  record: PrismaBlogRecord
): BlogPost {
  const parsedContent = splitBlogContent(
    record.content
  );
  const metadata = parsedContent.metadata;
  const category = toBlogCategory(record.category);
  const keywords = Array.isArray(metadata.keywords)
    ? metadata.keywords.filter(Boolean)
    : [];
  const tags = Array.isArray(metadata.tags)
    ? metadata.tags.filter(Boolean)
    : keywords;

  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    createdAt: record.createdAt.toISOString(),
    featuredImage: record.featuredImage ?? "",
    imageAlt: metadata.imageAlt ?? record.title,
    shortDescription: record.shortDescription,
    tickerText: normalizeTickerText(
      record.tickerText
    ),
    showInTicker: record.showInTicker ?? false,
    tickerOrder: normalizeTickerOrder(
      record.tickerOrder
    ),
    category,
    country: record.country || "India",
    tags: tags.length ? tags : [category],
    authorId: record.authorId,
    authorName:
      record.author?.name ??
      "ILMALINK Editorial Team",
    publishDate:
      metadata.publishDate ??
      record.createdAt
        .toISOString()
        .slice(0, 10),
    updatedAt: record.updatedAt.toISOString(),
    readTime:
      metadata.readTime ??
      calculateReadTime(record.content),
    views: record.views,
    status: toBlogStatus(record.status),
    seoTitle:
      metadata.seoTitle ?? record.title,
    metaDescription:
      metadata.metaDescription ??
      record.shortDescription,
    keywords,
    images: metadata.images ?? [],
    content: parsedContent.content,
  };
}

function addBlogToMap(
  map: Map<string, BlogPost>,
  blog: BlogPost
) {
  for (const [id, item] of map) {
    if (item.slug === blog.slug && id !== blog.id) {
      map.delete(id);
    }
  }

  map.set(blog.id, blog);
}

function getSortedPublishedBlogs(
  database: BlogDatabase
) {
  return database.blogs
    .filter((blog) => blog.status === "published")
    .sort(
      (a, b) =>
        Date.parse(b.publishDate) -
        Date.parse(a.publishDate)
    );
}

function toBlogSummaryPost(
  blog: BlogPost
): BlogSummaryPost {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    featuredImage: blog.featuredImage,
    imageAlt: blog.imageAlt,
    shortDescription: blog.shortDescription,
    category: blog.category,
    country: blog.country,
    tags: blog.tags,
    publishDate: blog.publishDate,
    readTime: blog.readTime,
    views: blog.views,
  };
}

async function readPrismaBlogs() {
  try {
    const findManyBlogs = prisma.blog.findMany as unknown as (args: {
      select: Record<string, unknown>;
      orderBy: {
        createdAt: "desc";
      };
    }) => Promise<PrismaBlogRecord[]>;

    const records = await findManyBlogs({
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        content: true,
        category: true,
        country: true,
        featuredImage: true,
        tickerText: true,
        showInTicker: true,
        tickerOrder: true,
        status: true,
        views: true,
        createdAt: true,
        updatedAt: true,
        authorId: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return records.map((record) => mapPrismaBlog(record));
  } catch (error) {
    console.log(
      "Read blog database error:",
      error
    );

    return [];
  }
}

async function readPrismaComments() {
  const commentModel = getPrismaBlogCommentModel();

  if (!commentModel) {
    return [];
  }

  try {
    const records = await commentModel.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return records.map((record) => ({
      id: record.id,
      blogId: record.blogId,
      authorName: record.authorName,
      message: record.message,
      status:
        record.status === "approved"
          ? "approved"
          : "pending",
      createdAt: record.createdAt.toISOString(),
    })) satisfies BlogComment[];
  } catch (error) {
    console.log(
      "Read blog comments error:",
      error
    );

    return [];
  }
}

function mergeBlogComments(
  fileComments: BlogComment[],
  prismaComments: BlogComment[]
) {
  const comments = new Map<string, BlogComment>();

  for (const comment of fileComments) {
    comments.set(comment.id, comment);
  }

  for (const comment of prismaComments) {
    comments.set(comment.id, comment);
  }

  return Array.from(comments.values()).sort(
    (a, b) =>
      Date.parse(b.createdAt) -
      Date.parse(a.createdAt)
  );
}

async function readDatabase(): Promise<BlogDatabase> {
  const fileDatabase = await readFileDatabase();
  const prismaBlogs = await readPrismaBlogs();
  const prismaComments = await readPrismaComments();

  if (prismaBlogs.length === 0) {
    return {
      ...fileDatabase,
      comments: mergeBlogComments(
        fileDatabase.comments,
        prismaComments
      ),
    };
  }

  const blogs = new Map<string, BlogPost>();
  const drafts = new Map<string, BlogPost>();

  for (const blog of fileDatabase.blogs) {
    addBlogToMap(blogs, blog);
  }

  for (const blog of fileDatabase.drafts) {
    addBlogToMap(drafts, blog);
  }

  for (const blog of prismaBlogs) {
    if (blog.status === "draft") {
      addBlogToMap(drafts, blog);
    } else {
      addBlogToMap(blogs, blog);
    }
  }

  return {
    ...fileDatabase,
    blogs: Array.from(blogs.values()),
    drafts: Array.from(drafts.values()),
    comments: mergeBlogComments(
      fileDatabase.comments,
      prismaComments
    ),
  };
}

async function writeFileDatabase(database: BlogDatabase) {
  await fs.mkdir(path.dirname(databasePath), {
    recursive: true,
  });

  await fs.writeFile(
    databasePath,
    JSON.stringify(database, null, 2)
  );
}

async function ensureFallbackAuthorId() {
  const fallbackEmail = "admin@ilmalink.com";

  const userByEmail =
    await prisma.user.findUnique({
      where: {
        email: fallbackEmail,
      },
    });

  if (userByEmail) {
    return userByEmail.id;
  }

  const userById =
    await prisma.user.findUnique({
      where: {
        id: "user-admin",
      },
    });

  if (userById) {
    return userById.id;
  }

  const user = await prisma.user.create({
    data: {
      id: "user-admin",
      name: "ILMALINK Admin",
      email: fallbackEmail,
      password: "system-user",
      role: "admin",
    },
  });

  return user.id;
}

async function resolveAuthorId(authorId: string) {
  if (authorId) {
    const user = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    if (user) {
      return user.id;
    }
  }

  return ensureFallbackAuthorId();
}

async function writePrismaDatabase(
  database: BlogDatabase
) {
  const posts = [
    ...database.blogs,
    ...database.drafts,
  ];

  for (const blog of posts) {
    const authorId = await resolveAuthorId(
      blog.authorId
    );

    const data = {
      title: blog.title,
      slug: blog.slug,
      shortDescription: blog.shortDescription,
      content: joinBlogContent(
        blog.content,
        stringifyBlogMetadata(blog)
      ),
      category: blog.category,
      country: blog.country || "India",
      featuredImage:
        blog.featuredImage || null,
      tickerText: normalizeTickerText(
        blog.tickerText
      ),
      showInTicker: blog.showInTicker ?? false,
      tickerOrder: normalizeTickerOrder(
        blog.tickerOrder
      ),
      status: blog.status,
      views: blog.views,
      createdAt: safeDate(blog.publishDate),
      authorId,
    };

    const existing = await prisma.blog.findFirst({
      where: {
        OR: [
          {
            id: blog.id,
          },
          {
            slug: blog.slug,
          },
        ],
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      await prisma.blog.update({
        where: {
          id: existing.id,
        },
        data,
        select: {
          id: true,
        },
      });
    } else {
      await prisma.blog.create({
        data: {
          id: blog.id,
          ...data,
        },
        select: {
          id: true,
        },
      });
    }
  }
}

export const getBlogDatabase = cache(readDatabase);

export async function getFreshBlogDatabase() {
  return readDatabase();
}

export async function saveBlogDatabase(
  database: BlogDatabase
) {
  let databaseSaved = false;
  let fileSaved = false;
  let databaseError: unknown = null;
  let fileError: unknown = null;

  try {
    await writePrismaDatabase(database);
    databaseSaved = true;
  } catch (error) {
    databaseError = error;
    console.log(
      "Save blog database error:",
      error
    );
  }

  try {
    await writeFileDatabase(database);
    fileSaved = true;
  } catch (error) {
    fileError = error;
    console.log(
      "Save blog file backup error:",
      error
    );
  }

  if (!databaseSaved && !fileSaved) {
    throw databaseError ?? fileError;
  }
}

export async function saveBlogComment(
  comment: BlogComment
) {
  let databaseSaved = false;
  let fileSaved = false;
  let databaseError: unknown = null;
  let fileError: unknown = null;
  const commentModel = getPrismaBlogCommentModel();

  if (commentModel) {
    try {
      await commentModel.create({
        data: {
          id: comment.id,
          blogId: comment.blogId,
          authorName: comment.authorName,
          message: comment.message,
          status: comment.status,
          createdAt: safeDate(comment.createdAt),
        },
        select: {
          id: true,
        },
      });
      databaseSaved = true;
    } catch (error) {
      databaseError = error;
      console.log(
        "Save blog comment error:",
        error
      );
    }
  }

  try {
    const database = await readFileDatabase();
    database.comments = [
      comment,
      ...database.comments.filter(
        (item) => item.id !== comment.id
      ),
    ];
    await writeFileDatabase(database);
    fileSaved = true;
  } catch (error) {
    fileError = error;
    console.log(
      "Save blog comment backup error:",
      error
    );
  }

  if (!databaseSaved && !fileSaved) {
    throw databaseError ?? fileError;
  }
}

export async function deleteStoredBlog(
  blogId: string,
  slug?: string
) {
  try {
    await prisma.blog.deleteMany({
      where: {
        OR: [
          {
            id: blogId,
          },
          ...(slug
            ? [
                {
                  slug,
                },
              ]
            : []),
        ],
      },
    });
  } catch (error) {
    console.log(
      "Delete stored blog error:",
      error
    );
  }
}

export async function getPublishedBlogs() {
  const database = await getBlogDatabase();

  return getSortedPublishedBlogs(database);
}

export async function getPublishedBlogSummaries() {
  const blogs = await getPublishedBlogs();

  return blogs.map(toBlogSummaryPost);
}

const HOMEPAGE_BLOG_CATEGORIES = new Set([
  "MBBS India",
  "MBBS Abroad",
  "NEET",
  "Scholarships",
  "Medical Admission",
]);

const OTHER_ENTRANCE_EXAM_KEYWORDS = [
  "wbjee",
  "jee main",
  "jeeadvanced",
  "jee advanced",
  "jee",
  "mht-cet",
  "mhcet",
  "gujcet",
  "keam",
  "engineering",
  "btech",
  "b.tech",
  "pharmacy",
  "bpharm",
  "b.pharm",
  "pharm",
  "non-medical",
];

function containsOtherEntranceExamKeyword(value: string) {
  const normalized = value.toLowerCase();

  return OTHER_ENTRANCE_EXAM_KEYWORDS.some((keyword) =>
    normalized.includes(keyword)
  );
}

function isOtherEntranceExamBlog(blog: BlogSummaryPost) {
  if (blog.category === "Other Entrance Exams") {
    return true;
  }

  if (containsOtherEntranceExamKeyword(blog.title)) {
    return true;
  }

  if (containsOtherEntranceExamKeyword(blog.slug)) {
    return true;
  }

  if (containsOtherEntranceExamKeyword(blog.shortDescription)) {
    return true;
  }

  return blog.tags.some((tag) =>
    containsOtherEntranceExamKeyword(tag)
  );
}

function isHomepageMedicalBlog(blog: BlogSummaryPost) {
  return (
    HOMEPAGE_BLOG_CATEGORIES.has(blog.category) &&
    !isOtherEntranceExamBlog(blog)
  );
}

export async function getLatestBlogs(limit = 8) {
  const blogs = await getPublishedBlogs();

  return blogs.slice(0, limit);
}

export async function getLatestBlogSummaries(limit = 8) {
  const blogs = await getPublishedBlogSummaries();

  return blogs.slice(0, limit);
}

export async function getLatestHomepageBlogSummaries(
  limit = 8
) {
  const blogs = await getPublishedBlogSummaries();

  return blogs
    .filter(isHomepageMedicalBlog)
    .slice(0, limit);
}

export async function getLatestOtherEntranceExamBlogSummaries(
  limit = 4
) {
  const blogs = await getPublishedBlogSummaries();

  return blogs.filter(isOtherEntranceExamBlog).slice(0, limit);
}

export async function getTickerBlogs(
  limit = 12
): Promise<BlogTickerPost[]> {
  const database = await readDatabase();

  return database.blogs
    .filter(
      (blog) =>
        blog.status === "published" &&
        blog.showInTicker === true
    )
    .sort((a, b) => {
      const orderDifference =
        normalizeTickerOrder(a.tickerOrder) -
        normalizeTickerOrder(b.tickerOrder);

      if (orderDifference !== 0) {
        return orderDifference;
      }

      const aDate = Date.parse(
        a.publishDate ||
          a.createdAt ||
          a.updatedAt
      );
      const bDate = Date.parse(
        b.publishDate ||
          b.createdAt ||
          b.updatedAt
      );

      return (
        (Number.isNaN(bDate) ? 0 : bDate) -
        (Number.isNaN(aDate) ? 0 : aDate)
      );
    })
    .slice(0, limit)
    .map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      tickerText: normalizeTickerText(
        blog.tickerText
      ),
      shortDescription: blog.shortDescription,
      publishDate: blog.publishDate,
      createdAt:
        blog.createdAt ??
        blog.publishDate ??
        blog.updatedAt,
      tickerOrder: normalizeTickerOrder(
        blog.tickerOrder
      ),
    }));
}

export async function getApprovedBlogComments(
  blogId: string
) {
  const database = await getBlogDatabase();

  return database.comments
    .filter(
      (comment) =>
        comment.blogId === blogId &&
        comment.status === "approved"
    )
    .sort(
      (a, b) =>
        Date.parse(b.createdAt) -
        Date.parse(a.createdAt)
    );
}

export async function getBlogBySlug(slug: string) {
  const blogs = await getPublishedBlogs();

  return (
    blogs.find((blog) => blog.slug === slug) ?? null
  );
}

export async function getBlogArticleData(
  slug: string,
  relatedLimit = 3
) {
  const database = await getBlogDatabase();
  const blogs = getSortedPublishedBlogs(database);
  const post =
    blogs.find((blog) => blog.slug === slug) ?? null;

  if (!post) {
    return {
      post,
      related: [],
      adjacent: {
        previous: null,
        next: null,
      },
      comments: [],
    };
  }

  const index = blogs.findIndex(
    (blog) => blog.id === post.id
  );
  const related = blogs
    .filter((blog) => blog.id !== post.id)
    .filter(
      (blog) =>
        blog.category === post.category ||
        blog.country === post.country ||
        blog.tags.some((tag) =>
          post.tags.includes(tag)
        )
    )
    .slice(0, relatedLimit);
  const comments = database.comments
    .filter(
      (comment) =>
        comment.blogId === post.id &&
        comment.status === "approved"
    )
    .sort(
      (a, b) =>
        Date.parse(b.createdAt) -
        Date.parse(a.createdAt)
    );

  return {
    post,
    related,
    adjacent: {
      previous:
        index > 0 ? blogs[index - 1] : null,
      next:
        index >= 0 &&
        index < blogs.length - 1
          ? blogs[index + 1]
          : null,
    },
    comments,
  };
}

export async function getRelatedBlogs(
  post: BlogPost,
  limit = 3
) {
  const blogs = await getPublishedBlogs();

  return blogs
    .filter((blog) => blog.id !== post.id)
    .filter(
      (blog) =>
        blog.category === post.category ||
        blog.country === post.country ||
        blog.tags.some((tag) =>
          post.tags.includes(tag)
        )
    )
    .slice(0, limit);
}

export async function getAdjacentBlogs(
  post: BlogPost
) {
  const blogs = await getPublishedBlogs();

  const index = blogs.findIndex(
    (blog) => blog.id === post.id
  );

  return {
    previous:
      index > 0 ? blogs[index - 1] : null,

    next:
      index >= 0 &&
      index < blogs.length - 1
        ? blogs[index + 1]
        : null,
  };
}

export function filterAndSortBlogs(
  blogs: BlogPost[],
  options: {
    query?: string;
    category?: string;
    country?: string;
    sort?: BlogSort;
  }
) {
  const query = options.query
    ?.trim()
    .toLowerCase();

  return blogs
    .filter((blog) => {
      const matchesQuery =
        !query ||
        [
          blog.title,
          blog.shortDescription,
          blog.category,
          blog.country,
          ...blog.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        !options.category ||
        blog.category === options.category;

      const matchesCountry =
        !options.country ||
        blog.country === options.country;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesCountry
      );
    })

    .sort((a, b) => {
      if (options.sort === "oldest") {
        return (
          Date.parse(a.publishDate) -
          Date.parse(b.publishDate)
        );
      }

      if (options.sort === "most-viewed") {
        return b.views - a.views;
      }

      return (
        Date.parse(b.publishDate) -
        Date.parse(a.publishDate)
      );
    });
}

export async function getBlogUser(
  email: string
) {
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  return withEffectiveBlogRole(user);
}

export async function getBlogUserById(
  id: string
) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return withEffectiveBlogRole(user);
}

export async function createBlogUser(
  user: Omit<BlogUser, "id" | "createdAt">
) {
  const exists = await prisma.user.findUnique({
    where: {
      email: user.email.toLowerCase(),
    },
  });

  if (exists) {
    return {
      ok: false,
      message: "Account already exists.",
    };
  }

  const role = getEffectiveBlogRole(
    user.email,
    user.role
  );

  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email.toLowerCase(),
      password: user.password,
      role,
    },
  });

  return {
    ok: true,
    message: "Account created.",
  };
}

export function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/g, "");
}

export function calculateReadTime(
  content: string
) {
  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(
    1,
    Math.ceil(words / 220)
  )} min read`;
}

export function getCountries(
  blogs: Pick<BlogPost, "country">[]
) {
  return Array.from(
    new Set(
      blogs.map((blog) => blog.country)
    )
  ).sort();
}

export function isBlogCategory(
  value: FormDataEntryValue | null
): value is BlogCategory {
  return (
    typeof value === "string" &&
    Boolean(value.trim())
  );
}
