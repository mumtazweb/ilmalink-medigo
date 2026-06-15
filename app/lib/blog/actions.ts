"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import { sendOtpEmail } from "./email";

import {
  clearBlogSession,
  getCurrentBlogUser,
  setBlogSession,
} from "./auth";

import {
  calculateReadTime,
  createBlogUser,
  createSlug,
  deleteStoredBlog,
  getBlogUser,
  getFreshBlogDatabase,
  isBlogCategory,
  saveBlogComment,
  saveBlogDatabase,
} from "./store";

import type { BlogDatabase, BlogPost, BlogStatus } from "./types";

type ActionState = {
  ok: boolean;
  message: string;
};

function isNextRedirectError(error: unknown): error is { digest: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

function parseTickerText(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .trim()
    .slice(0, 100);
}

function parseTickerOrder(value: FormDataEntryValue | null) {
  const order = Number.parseInt(
    String(value ?? "").trim(),
    10
  );

  return Number.isFinite(order) && order > 0
    ? order
    : 999;
}

function normalizeTickerOrderValue(value: number | undefined) {
  return Number.isFinite(value) && value && value > 0
    ? value
    : 999;
}

function shouldReserveTickerOrder(
  blog: BlogPost,
  existingBlog?: BlogPost
) {
  if (
    blog.status !== "published" ||
    blog.showInTicker !== true
  ) {
    return false;
  }

  return !(
    existingBlog?.status === "published" &&
    existingBlog.showInTicker === true &&
    normalizeTickerOrderValue(existingBlog.tickerOrder) ===
      normalizeTickerOrderValue(blog.tickerOrder)
  );
}

function adjustTickerOrdersForBlog(
  database: BlogDatabase,
  blog: BlogPost,
  existingBlog?: BlogPost
) {
  if (!shouldReserveTickerOrder(blog, existingBlog)) {
    return;
  }

  const requestedOrder = normalizeTickerOrderValue(
    blog.tickerOrder
  );
  const usedOrders = new Set<number>([
    requestedOrder,
  ]);
  const tickerBlogs = [
    ...database.blogs,
    ...database.drafts,
  ]
    .filter(
      (item) =>
        item.id !== blog.id &&
        item.status === "published" &&
        item.showInTicker === true
    )
    .sort((a, b) => {
      const orderDifference =
        normalizeTickerOrderValue(a.tickerOrder) -
        normalizeTickerOrderValue(b.tickerOrder);

      if (orderDifference !== 0) {
        return orderDifference;
      }

      return (
        Date.parse(b.publishDate || b.updatedAt) -
        Date.parse(a.publishDate || a.updatedAt)
      );
    });

  blog.tickerOrder = requestedOrder;

  for (const tickerBlog of tickerBlogs) {
    let nextOrder = normalizeTickerOrderValue(
      tickerBlog.tickerOrder
    );

    if (nextOrder >= requestedOrder) {
      nextOrder += 1;
    }

    while (usedOrders.has(nextOrder)) {
      nextOrder += 1;
    }

    tickerBlog.tickerOrder = nextOrder;
    usedOrders.add(nextOrder);
  }
}

function parseBlogCategory(
  categoryValue: FormDataEntryValue | null,
  customCategoryValue: FormDataEntryValue | null
) {
  if (!isBlogCategory(categoryValue)) {
    return null;
  }

  const selectedCategory = categoryValue.trim();

  if (selectedCategory !== "Other") {
    return selectedCategory;
  }

  const customCategory = String(customCategoryValue ?? "")
    .trim()
    .slice(0, 191);

  return customCategory || null;
}

export async function signInAction(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const email = String(
      formData.get("email") ?? ""
    )
      .trim()
      .toLowerCase();

    const password = String(
      formData.get("password") ?? ""
    ).trim();

    if (!email || !password) {
      return {
        ok: false,
        message:
          "Please enter email and password.",
      };
    }

    const user = await getBlogUser(email);

    if (!user) {
      return {
        ok: false,
        message: "Invalid ID or password.",
      };
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return {
        ok: false,
        message: "Invalid ID or password.",
      };
    }

    await setBlogSession(user.id);

    redirect("/dashboard");
  } catch (error: unknown) {
    if (isNextRedirectError(error)) {
      throw error;
    }

    console.log("Sign in error:", error);

    return {
      ok: false,
      message:
        "Something went wrong during sign in.",
    };
  }
}

export async function createAccountAction(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const name = String(
      formData.get("name") ?? ""
    ).trim();

    const email = String(
      formData.get("email") ?? ""
    )
      .trim()
      .toLowerCase();

    const password = String(
      formData.get("password") ?? ""
    ).trim();

    if (!name || !email || !password) {
      return {
        ok: false,
        message:
          "Please fill all required fields.",
      };
    }

    if (password.length < 6) {
      return {
        ok: false,
        message:
          "Password must contain at least 6 characters.",
      };
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const result = await createBlogUser({
      name,
      email,
      password: hashedPassword,
      role: "author",
    });

    if (!result.ok) {
      return result;
    }

    const user = await getBlogUser(email);

    if (user) {
      await setBlogSession(user.id);
    }

    redirect("/dashboard");
  } catch (error: unknown) {
    if (isNextRedirectError(error)) {
      throw error;
    }

    console.log(
      "Create account error:",
      error
    );

    return {
      ok: false,
      message:
        "Something went wrong while creating account.",
    };
  }
}

export async function signOutAction() {
  await clearBlogSession();

  redirect("/login");
}

export async function saveBlogAction(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const user =
      await getCurrentBlogUser();

    if (!user) {
      return {
        ok: false,
        message:
          "Please sign in before creating a blog.",
      };
    }

    const title = String(
      formData.get("title") ?? ""
    ).trim();

    const blogId = String(
      formData.get("blogId") ?? ""
    ).trim();

    const slugValue = String(
      formData.get("slug") ?? ""
    ).trim();

    const featuredImage = String(
      formData.get("featuredImage") ?? ""
    ).trim();

    const shortDescription = String(
      formData.get("shortDescription") ?? ""
    ).trim();

    const tickerText = parseTickerText(
      formData.get("tickerText")
    );

    const showInTicker =
      formData.get("showInTicker") === "on";

    const tickerOrder = parseTickerOrder(
      formData.get("tickerOrder")
    );

    const country = String(
      formData.get("country") ?? ""
    ).trim();

    const seoTitle = String(
      formData.get("seoTitle") ?? ""
    ).trim();

    const metaDescription = String(
      formData.get("metaDescription") ?? ""
    ).trim();

    const keywords = String(
      formData.get("keywords") ?? ""
    )
      .split(",")
      .map((keyword) =>
        keyword.trim()
      )
      .filter(Boolean);

    const content = String(
      formData.get("content") ?? ""
    ).trim();

    const statusIntent = String(
      formData.get("status") ?? "draft"
    );

    const imagesJson = String(
      formData.get("images") ?? "[]"
    ).trim();

    let images = [];
    try {
      images = JSON.parse(imagesJson);
    } catch {
      // If JSON parsing fails, use empty array
      images = [];
    }

    const category = parseBlogCategory(
      formData.get("category"),
      formData.get("customCategory")
    );

    if (
      !title ||
      !shortDescription ||
      !content ||
      !category
    ) {
      return {
        ok: false,
        message:
          "Title, short description, category and content are required.",
      };
    }

    const database =
      await getFreshBlogDatabase();

    const slug = createSlug(
      slugValue || title
    );

    const status: BlogStatus =
      statusIntent === "published" &&
      (user.role === "admin" ||
        user.role === "editor")
        ? "published"
        : statusIntent === "pending"
          ? "pending"
          : "draft";

    const existingBlog = [
      ...database.blogs,
      ...database.drafts,
    ].find(
      (blog) => blog.id === blogId
    );

    if (blogId && !existingBlog) {
      return {
        ok: false,
        message: "Blog not found.",
      };
    }

    if (
      existingBlog &&
      user.role !== "admin" &&
      existingBlog.authorId !==
        user.id
    ) {
      return {
        ok: false,
        message:
          "You can edit only your own blogs.",
      };
    }

    if (
      [
        ...database.blogs,
        ...database.drafts,
      ].some(
        (blog) =>
          blog.slug === slug &&
          blog.id !== blogId
      )
    ) {
      return {
        ok: false,
        message:
          "A blog with this slug already exists.",
      };
    }

    const blog: BlogPost = {
      id:
        existingBlog?.id ??
        `blog-${Date.now()}`,

      title,

      slug,

      featuredImage,

      imageAlt: title,

      shortDescription,

      tickerText: tickerText || null,

      showInTicker,

      tickerOrder,

      category,

      country:
        country || "India",

      tags: keywords.length
        ? keywords
        : [category],

      authorId:
        existingBlog?.authorId ??
        user.id,

      authorName:
        existingBlog?.authorName ??
        user.name,

      publishDate:
        existingBlog?.publishDate ??
        new Date()
          .toISOString()
          .slice(0, 10),

      updatedAt:
        new Date().toISOString(),

      readTime:
        calculateReadTime(content),

      views:
        existingBlog?.views ?? 0,

      status,

      seoTitle:
        seoTitle || title,

      metaDescription:
        metaDescription ||
        shortDescription,

      keywords,

      content,

      images,
    };

    adjustTickerOrdersForBlog(
      database,
      blog,
      existingBlog
    );

    database.blogs =
      database.blogs.filter(
        (item) => item.id !== blog.id
      );

    database.drafts =
      database.drafts.filter(
        (item) => item.id !== blog.id
      );

    if (status === "draft") {
      database.drafts.push(blog);
    } else {
      database.blogs.push(blog);
    }

    await saveBlogDatabase(database);

    revalidatePath("/blogs");
    revalidatePath("/dashboard");

    return {
      ok: true,
      message:
        status === "published"
          ? "Blog published."
          : "Blog saved.",
    };
  } catch (error) {
    console.log(
      "Save blog error:",
      error
    );

    return {
      ok: false,
      message:
        "Something went wrong while saving blog.",
    };
  }
}

export async function approveBlogAction(
  blogId: string
) {
  try {
    const user =
      await getCurrentBlogUser();

    if (
      !user ||
      (user.role !== "admin" &&
        user.role !== "editor")
    ) {
      return;
    }

    const database =
      await getFreshBlogDatabase();

    const blog = [
      ...database.blogs,
      ...database.drafts,
    ].find((item) => item.id === blogId);

    if (!blog) {
      return;
    }

    const previousBlogState = {
      ...blog,
    };

    blog.status = "published";

    blog.publishDate = new Date()
      .toISOString()
      .slice(0, 10);

    blog.updatedAt =
      new Date().toISOString();

    adjustTickerOrdersForBlog(
      database,
      blog,
      previousBlogState
    );

    database.blogs =
      database.blogs.filter(
        (item) => item.id !== blog.id
      );

    database.drafts =
      database.drafts.filter(
        (item) => item.id !== blog.id
      );

    database.blogs.push(blog);

    await saveBlogDatabase(database);

    revalidatePath("/blogs");
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(
      "Approve blog error:",
      error
    );
  }
}

export async function deleteBlogAction(
  blogId: string
) {
  try {
    const user =
      await getCurrentBlogUser();

    const database =
      await getFreshBlogDatabase();

    const blog = [
      ...database.blogs,
      ...database.drafts,
    ].find((item) => item.id === blogId);

    if (!user || !blog) {
      return;
    }

    if (
      user.role !== "admin" &&
      blog.authorId !== user.id
    ) {
      return;
    }

    database.blogs =
      database.blogs.filter(
        (item) => item.id !== blogId
      );

    database.drafts =
      database.drafts.filter(
        (item) => item.id !== blogId
      );

    await saveBlogDatabase(database);
    await deleteStoredBlog(blogId, blog.slug);

    revalidatePath("/blogs");
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(
      "Delete blog error:",
      error
    );
  }
}

export async function submitBlogCommentAction(
  formData: FormData
) {
  const blogId = String(
    formData.get("blogId") ?? ""
  ).trim();
  const blogSlug = String(
    formData.get("blogSlug") ?? ""
  ).trim();
  const authorName = String(
    formData.get("authorName") ?? ""
  )
    .trim()
    .slice(0, 80);
  const message = String(
    formData.get("message") ?? ""
  )
    .trim()
    .slice(0, 1000);

  if (!blogId || !blogSlug || !authorName || !message) {
    redirect(`/blogs/${blogSlug}#comments`);
  }

  const database = await getFreshBlogDatabase();
  const blog = database.blogs.find(
    (item) =>
      item.id === blogId &&
      item.slug === blogSlug &&
      item.status === "published"
  );

  if (!blog) {
    redirect("/blogs");
  }

  await saveBlogComment({
    id: `comment-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`,
    blogId: blog.id,
    authorName,
    message,
    status: "approved",
    createdAt: new Date().toISOString(),
  });

  revalidatePath(`/blogs/${blog.slug}`);
  redirect(`/blogs/${blog.slug}?comment=submitted#comments`);
}

export async function forgotPasswordAction(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const email = String(
      formData.get("email") ?? ""
    )
      .trim()
      .toLowerCase();

    if (!email) {
      return {
        ok: false,
        message: "Email is required.",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        ok: false,
        message: "No account found.",
      };
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiry = new Date(
      Date.now() + 1000 * 60 * 10
    );

    await prisma.user.update({
      where: {
        email,
      },

      data: {
        resetOtp: otp,
        resetOtpExpiry: expiry,
      },
    });

    const emailResult =
      await sendOtpEmail(email, otp);

    if (!emailResult.ok) {
      return {
        ok: false,
        message:
          "Failed to send OTP email.",
      };
    }

    return {
      ok: true,
      message:
        "OTP sent to your email.",
    };
  } catch (error) {
    console.log(
      "Forgot password error:",
      error
    );

    return {
      ok: false,
      message:
        "Something went wrong.",
    };
  }
}


export async function deleteUserAction(
  userId: string
) {
  try {
    const currentUser =
      await getCurrentBlogUser();

    if (
      !currentUser ||
      currentUser.role !== "admin"
    ) {
      return;
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!existingUser) {
      return;
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.log(
      "Delete user error:",
      error
    );
  }
}
export async function resetPasswordAction(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const email = String(
      formData.get("email") ?? ""
    )
      .trim()
      .toLowerCase();

    const otp = String(
      formData.get("otp") ?? ""
    ).trim();

    const password = String(
      formData.get("password") ?? ""
    ).trim();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        ok: false,
        message: "User not found.",
      };
    }

    if (
      !user.resetOtp ||
      user.resetOtp !== otp
    ) {
      return {
        ok: false,
        message: "Invalid OTP.",
      };
    }

    if (
      !user.resetOtpExpiry ||
      user.resetOtpExpiry < new Date()
    ) {
      return {
        ok: false,
        message: "OTP expired.",
      };
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        email,
      },

      data: {
        password: hashedPassword,
        resetOtp: null,
        resetOtpExpiry: null,
      },
    });

    return {
      ok: true,
      message:
        "Password reset successful.",
    };
  } catch (error) {
    console.log(
      "Reset password error:",
      error
    );

    return {
      ok: false,
      message:
        "Something went wrong.",
    };
  }
}
