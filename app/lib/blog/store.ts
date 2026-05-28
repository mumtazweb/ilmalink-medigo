import { cache } from "react";
import { prisma } from "../prisma";
import { promises as fs } from "fs";
import path from "path";
import { seedDatabase } from "./seed";

import type {
  BlogCategory,
  BlogDatabase,
  BlogPost,
  BlogSort,
  BlogUser,
} from "./types";

const databasePath = path.join(
  process.cwd(),
  "data",
  "blog-db.json"
);

async function readDatabase(): Promise<BlogDatabase> {
  try {
    const file = await fs.readFile(databasePath, "utf8");

    return JSON.parse(file) as BlogDatabase;
  } catch {
    return seedDatabase;
  }
}

async function writeDatabase(database: BlogDatabase) {
  await fs.mkdir(path.dirname(databasePath), {
    recursive: true,
  });

  await fs.writeFile(
    databasePath,
    JSON.stringify(database, null, 2)
  );
}

export const getBlogDatabase = cache(readDatabase);

export async function getFreshBlogDatabase() {
  return readDatabase();
}

export async function saveBlogDatabase(
  database: BlogDatabase
) {
  await writeDatabase(database);
}

export async function getPublishedBlogs() {
  const database = await readDatabase();

  return database.blogs
    .filter((blog) => blog.status === "published")
    .sort(
      (a, b) =>
        Date.parse(b.publishDate) -
        Date.parse(a.publishDate)
    );
}

export async function getLatestBlogs(limit = 8) {
  const blogs = await getPublishedBlogs();

  return blogs.slice(0, limit);
}

export async function getBlogBySlug(slug: string) {
  const blogs = await getPublishedBlogs();

  return (
    blogs.find((blog) => blog.slug === slug) ?? null
  );
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
  return prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });
}

export async function getBlogUserById(
  id: string
) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
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

  let role: "admin" | "editor" | "author" = "author";

if (
  user.email.trim().toLowerCase() ===
  "injamulhoquemiddya@gmail.com"
) {
  role = "admin";
}

if (
  user.email.trim().toLowerCase() ===
  "middya@ilmalink.com"
) {
  role = "editor";
}

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
    .replace(/(^-|-$)/g, "");
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
  blogs: BlogPost[]
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
    seedDatabase.categories.includes(
      value as BlogCategory
    )
  );
}