import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/blog/BlogCard";

export default async function Home() {

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main>

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="max-w-3xl">

          <h1 className="text-6xl font-bold leading-tight">
            Modern Personal Blog Platform
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            Share your programming journey and knowledge.
          </p>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        {posts.length === 0 && (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold">
      No Posts Yet
    </h2>

    <p className="text-gray-500 mt-4">
      Start creating your first blog post.
    </p>
  </div>
)}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}

        </div>

      </section>

    </main>
  );
}