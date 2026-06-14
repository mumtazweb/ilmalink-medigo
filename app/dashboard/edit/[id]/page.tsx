import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Navbar from "@/app/components/navbar";
import BlogEditorForm from "@/app/components/blog/BlogEditorForm";
import { getCurrentBlogUser } from "@/app/lib/blog/auth";
import { getFreshBlogDatabase } from "@/app/lib/blog/store";

type EditBlogPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Edit Blog | ILMALINK MEDIGO",
  description: "Edit an ILMALINK MEDIGO blog post.",
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const user = await getCurrentBlogUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;
  const database = await getFreshBlogDatabase();
  const blog = [...database.blogs, ...database.drafts].find((item) => item.id === id);

  if (!blog) {
    notFound();
  }

  if (user.role !== "admin" && blog.authorId !== user.id) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />
      {/* BLOG SYSTEM: Edit existing blog while enforcing admin/author ownership rules. */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-36 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_54px_rgba(15,23,42,0.08)] md:p-7">
          <h1 className="text-3xl font-bold text-[#0F172A]">Edit blog</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Update blog content, SEO fields, status and approval workflow.
          </p>
          <div className="mt-6">
            <BlogEditorForm
              canPublish={user.role === "admin" || user.role === "editor"}
              initialBlog={blog}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
