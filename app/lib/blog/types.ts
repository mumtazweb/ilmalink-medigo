// BLOG SYSTEM: Shared database model types for users, blogs, categories, tags, comments, drafts, and views.
export type BlogRole = "admin" |"editor" | "author";

export type BlogStatus = "draft" | "pending" | "published" | "rejected";

export type BlogCategory = string;

export type ImagePosition =
  | "center top"
  | "center center"
  | "center bottom"
  | "left top"
  | "right top"
  | "left center"
  | "right center"
  | "left bottom"
  | "right bottom";

export type BlogImage = {
  id: string;
  url: string;
  alt: string;
  position: ImagePosition;
  order: number;
  size?: number;
  type?: string;
  fileName?: string;
};

export type BlogUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: BlogRole;
  createdAt: string;
};

export type BlogTag = {
  id: string;
  name: string;
  slug: string;
};

export type BlogComment = {
  id: string;
  blogId: string;
  authorName: string;
  message: string;
  status: "pending" | "approved";
  createdAt: string;
};

export type BlogView = {
  id: string;
  blogId: string;
  viewedAt: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  createdAt?: string;
  featuredImage: string;
  imageAlt: string;
  shortDescription: string;
  tickerText?: string | null;
  showInTicker?: boolean;
  tickerOrder?: number;
  category: BlogCategory;
  country: string;
  tags: string[];
  authorId: string;
  authorName: string;
  publishDate: string;
  updatedAt: string;
  readTime: string;
  views: number;
  status: BlogStatus;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  images?: BlogImage[];
  content: string;
  imagePosition?:
  | "top"
  | "center"
  | "bottom"
  | "left"
  | "right";
};

export type BlogTickerPost = {
  id: string;
  title: string;
  slug: string;
  tickerText: string | null;
  shortDescription: string;
  publishDate: string;
  createdAt: string;
  tickerOrder: number;
};

export type BlogDatabase = {
  users: BlogUser[];
  blogs: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  comments: BlogComment[];
  drafts: BlogPost[];
  views: BlogView[];
};

export type BlogSort = "latest" | "oldest" | "most-viewed";
