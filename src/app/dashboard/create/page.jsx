"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RichTextEditor from "@/components/editor/RichTextEditor";

export default function CreatePostPage() {
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
 
const [title, setTitle] = useState("");
const [category, setCategory] = useState("");
const [excerpt, setExcerpt] = useState("");
const [content, setContent] = useState("");
const [image, setImage] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

  const formData = new FormData();

formData.append("title", title);
formData.append("category", category);
formData.append("excerpt", excerpt);
formData.append("content", content);
formData.append("image", image);

    const response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to publish post.");
      setLoading(false);
      return;
    }

    setSuccess("Post published successfully.");
    e.target.reset();
    router.refresh();
    setLoading(false);
  }

  if (status === "loading") {
    return (
      <main className="pb-10 pt-8">
        <section className="page-section panel rounded-[2rem] px-6 py-20 text-center">
          <p className="text-lg font-medium text-[var(--muted)]">Preparing your editorial workspace...</p>
        </section>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <main className="pb-10 pt-8">
      <section className="page-section max-w-4xl">
        <div className="panel rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
          <span className="eyebrow">Compose</span>
          <h1 className="mt-5 text-4xl font-semibold text-[var(--foreground)]">
            Create a polished new article
          </h1>
          <p className="prose-copy mt-4 max-w-2xl">
            Draft a concise headline, set the context, and publish with visual polish. The form below is designed to feel like an editorial desk, not an admin afterthought.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                  Post title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Designing resilient systems for production"
                  className="field"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  placeholder="Engineering, Product, Career"
                  className="field"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                Summary
              </label>
             <RichTextEditor
  content={content}
  onChange={setContent}
/>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                Article body
              </label>
              <RichTextEditor
  content={content}
  onChange={setContent}
/>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                Cover image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="field file:mr-4 file:rounded-full file:border-0 file:bg-[var(--foreground)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                required
              />
            </div>

            {error ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            {success ? (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-6 py-3 text-sm font-semibold disabled:opacity-70"
              >
                {loading ? "Publishing..." : "Publish Post"}
              </button>

              <a href="/dashboard" className="btn-secondary px-6 py-3 text-sm font-semibold">
                Back to dashboard
              </a>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
