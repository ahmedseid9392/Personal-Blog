import Link from "next/link";

export default function BlogCard({ post }) {
  const createdAt = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group panel overflow-hidden rounded-[1.75rem]">
      <div className="relative overflow-hidden">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-56 items-end bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.22),_transparent_45%),linear-gradient(135deg,_#1f2937,_#475569)] p-6">
            <span className="eyebrow bg-white/12 text-white backdrop-blur-sm">
              Editorial Draft
            </span>
          </div>
        )}

        <div className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          {post.category || "General"}
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm font-medium text-[var(--muted)]">
          {createdAt}
        </p>

        <h2 className="mt-3 text-2xl font-semibold leading-tight text-[var(--foreground)]">
          {post.title}
        </h2>

        <p className="prose-copy mt-3 min-h-18 text-sm">
          {post.excerpt || "A sharp, professional write-up prepared for readers who value clear thinking and clean execution."}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]"
        >
          Read article
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
