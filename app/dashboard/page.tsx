import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";

import Navbar from "../components/navbar";
import BlogEditorForm from "../components/blog/BlogEditorForm";

import {
  approveBlogAction,
  deleteBlogAction,
  deleteUserAction,
  signOutAction,
} from "../lib/blog/actions";

import { getCurrentBlogUser } from "../lib/blog/auth";
import { getFreshBlogDatabase } from "../lib/blog/store";

export const metadata: Metadata = {
  title: "Blog Dashboard | ILMALINK MEDIGO",
  description:
    "Create, edit, approve and manage ILMALINK MEDIGO blog posts.",
};

export default async function DashboardPage() {
  const user = await getCurrentBlogUser();

  if (!user) {
    redirect("/login");
  }

  const database = await getFreshBlogDatabase();

  const manageableBlogs =
    user.role === "admin" || user.role === "editor"
      ? database.blogs
      : database.blogs.filter(
          (blog) => blog.authorId === user.id
        );

  const drafts =
    user.role === "admin" || user.role === "editor"
      ? database.drafts
      : database.drafts.filter(
          (blog) => blog.authorId === user.id
        );

  const users = await prisma.user.findMany({
  orderBy: {
    createdAt: "desc",
  },
});

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-36 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_54px_rgba(15,23,42,0.08)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#0F4CFF]">
              {user.role}
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#0F172A] md:text-5xl">
              Blog Editor Dashboard
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Create, save draft, submit for approval,
              publish and manage users based on role.
            </p>
          </div>

          <form action={signOutAction}>
            <button className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-bold text-[#0F172A] transition hover:border-[#0F4CFF]/30 hover:text-[#0F4CFF]">
              Sign out
            </button>
          </form>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_54px_rgba(15,23,42,0.08)] md:p-7">
            <h2 className="text-2xl font-bold text-[#0F172A]">
              Create blog
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Slug, read time and publishing workflow
              are handled automatically.
            </p>

            <div className="mt-6">
              <BlogEditorForm
                canPublish={
                  user.role === "admin" ||
                  user.role === "editor"
                }
              />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_54px_rgba(15,23,42,0.08)]">
              <h2 className="text-xl font-bold text-[#0F172A]">
                Publishing permissions
              </h2>

              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <p>
                  <strong>Admin:</strong> Create blog,
                  edit blog, delete blog, approve blog
                  posts and manage users.
                </p>

                <p>
                  <strong>Editor:</strong> Create blog,
                  edit blogs, approve blogs, publish
                  blogs and reject blogs.
                </p>

                <p>
                  <strong>Author:</strong> Create blog,
                  edit own blogs, save draft and submit
                  for approval.
                </p>
              </div>
            </div>

            {user.role === "admin" && (
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_54px_rgba(15,23,42,0.08)]">
                <h2 className="text-xl font-bold text-[#0F172A]">
                  Manage users
                </h2>

                <div className="mt-4 space-y-3">
                  {users.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4"
                    >
                      <p className="font-bold text-[#0F172A]">
                        {item.name}
                      </p>

                      <p className="text-sm text-slate-600">
                        {item.email}
                      </p>

                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#0F4CFF]">
                        {item.role}
                      </p>

                      {item.email !== user.email && (
                        <form
                          action={deleteUserAction.bind(
                            null,
                            item.id
                          )}
                          className="mt-3"
                        >
                          <button className="rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-600">
                            Delete User
                          </button>
                        </form>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_54px_rgba(15,23,42,0.08)] md:p-7">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Blog management
          </h2>

          <div className="mt-6 grid gap-4">
            {[...manageableBlogs, ...drafts].map(
              (blog) => (
                <div
                  key={blog.id}
                  className="grid gap-4 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 md:grid-cols-[1fr_auto]"
                >
                  <div>
                    <p className="font-bold text-[#0F172A]">
                      {blog.title}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {blog.category} · {blog.status} ·{" "}
                      {blog.readTime}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {blog.status === "published" && (
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#0F4CFF]"
                      >
                        Preview
                      </Link>
                    )}

                    <Link
                      href={`/dashboard/edit/${blog.id}`}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#0F172A]"
                    >
                      Edit
                    </Link>

                    {(user.role === "admin" ||
                      user.role === "editor") &&
                      blog.status !== "published" && (
                        <form
                          action={approveBlogAction.bind(
                            null,
                            blog.id
                          )}
                        >
                          <button className="rounded-full bg-[#16A34A] px-4 py-2 text-xs font-bold text-white">
                            Approve
                          </button>
                        </form>
                      )}

                    {user.role === "admin" && (
                      <form
                        action={deleteBlogAction.bind(
                          null,
                          blog.id
                        )}
                      >
                        <button className="rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-600">
                          Delete
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </section>
    </main>
  );
}