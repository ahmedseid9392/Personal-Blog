import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/blog/BlogCard";

export default async function Home() {
  let posts = [];
  let databaseError = false;

  try {
    posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch {
    databaseError = true;
  }

  return (
    <main className="pb-8 pt-8">
      <section className="page-section">
        <div className="panel relative overflow-hidden rounded-[2rem] px-6 py-14 sm:px-10 lg:px-14 lg:py-18">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(15,118,110,0.22),_transparent_68%)] blur-2xl" />
          <div className="absolute bottom-0 left-1/3 h-36 w-36 rounded-full bg-[radial-gradient(circle,_rgba(176,138,76,0.24),_transparent_70%)] blur-2xl" />

          <div className="relative grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="max-w-3xl">
              <span className="eyebrow">Professional Publishing</span>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-[var(--foreground)] sm:text-6xl">
                Thoughtful writing, presented with the discipline of a modern product.
              </h1>
              <p className="prose-copy mt-6 max-w-2xl text-lg">
                DevBlog is a refined editorial space for engineering insights, case studies,
                product notes, and carefully structured technical storytelling.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#latest-posts" className="btn-primary px-6 py-3 text-sm font-semibold">
                  Explore Articles
                </a>
                <a href="/dashboard/create" className="btn-secondary px-6 py-3 text-sm font-semibold">
                  Start Writing
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.5rem] border border-white/60 bg-white/72 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Published</p>
                <p className="mt-3 text-4xl font-semibold text-[var(--foreground)]">{posts.length}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">Articles in your live editorial archive.</p>
              </div>

              <div className="rounded-[1.5rem] border border-white/60 bg-white/72 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Style</p>
                <p className="mt-3 text-xl font-semibold text-[var(--foreground)]">Clear, calm, credible</p>
                <p className="mt-2 text-sm text-[var(--muted)]">Built for serious content, not template noise.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="latest-posts" className="page-section pt-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Latest Posts</span>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
              Writing that feels editorial, not improvised.
            </h2>
          </div>

          <p className="prose-copy max-w-xl text-sm">
            Browse recent essays, product notes, and technical reflections from your publishing workspace.
          </p>
        </div>

        {databaseError ? (
          <div className="panel rounded-[1.75rem] px-6 py-16 text-center">
            <h3 className="text-2xl font-semibold text-[var(--foreground)]">
              Database connection unavailable
            </h3>
            <p className="prose-copy mx-auto mt-3 max-w-xl">
              The interface is ready, but the app could not reach MongoDB right now. Verify your Atlas connection and try again.
            </p>
          </div>
        ) : null}

        {!databaseError && posts.length === 0 ? (
          <div className="panel rounded-[1.75rem] px-6 py-16 text-center">
            <h3 className="text-2xl font-semibold text-[var(--foreground)]">
              No posts published yet
            </h3>
            <p className="prose-copy mt-3">
              Create your first article to bring the editorial homepage to life.
            </p>
          </div>
        ) : null}

        {!databaseError && posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
