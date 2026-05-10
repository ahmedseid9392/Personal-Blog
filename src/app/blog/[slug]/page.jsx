import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function BlogDetailsPage({ params }) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="pb-10 pt-8">
      <section className="page-section">
        <article className="panel overflow-hidden rounded-[2rem]">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-[260px] w-full object-cover sm:h-[380px] lg:h-[500px]"
            />
          ) : (
            <div className="h-[260px] bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.26),_transparent_42%),linear-gradient(135deg,_#1f2937,_#475569)] sm:h-[380px] lg:h-[500px]" />
          )}

          <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">{post.category || "General"}</span>
              <span className="text-sm text-[var(--muted)]">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-[var(--foreground)] sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 text-sm font-medium text-[var(--muted)]">
              By {post.author?.name || "DevBlog Editor"}
            </p>

            {post.excerpt ? (
              <p className="prose-copy mt-6 max-w-3xl text-lg">
                {post.excerpt}
              </p>
            ) : null}

            <div className="mt-10 border-t border-[var(--border)] pt-8 text-lg leading-9 text-[color:var(--foreground)]/88 whitespace-pre-line">
            <div
  className="prose prose-lg max-w-none mt-10"
  dangerouslySetInnerHTML={{
    __html: post.content,
  }}
/>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
