"use server";

import { cookies } from "next/headers";

import { getBlogUserById } from "./store";

const SESSION_COOKIE = "ilmalink_blog_session";

function isDynamicServerUsageError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    (error as { digest?: unknown }).digest === "DYNAMIC_SERVER_USAGE"
  );
}

export async function setBlogSession(
  userId: string
) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearBlogSession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentBlogUser() {
  try {
    const cookieStore = await cookies();

    const session =
      cookieStore.get(SESSION_COOKIE);

    if (!session?.value) {
      return null;
    }

    const user = await getBlogUserById(
      session.value
    );

    return user;
  } catch (error) {
    if (isDynamicServerUsageError(error)) {
      throw error;
    }

    console.log(
      "Get current user error:",
      error
    );

    return null;
  }
}
