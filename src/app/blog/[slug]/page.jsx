import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function BlogDetailsPage({ params }) {

  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-[450px] object-cover rounded-3xl"
      />

      <div className="mt-10">

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
          {post.category}
        </span>

        <h1 className="text-5xl font-bold mt-6 leading-tight">
          {post.title}
        </h1>

        <p className="text-gray-500 mt-4">
          {new Date(post.createdAt).toDateString()}
        </p>

        <div className="mt-10 text-lg leading-9 text-gray-700 whitespace-pre-line">
          {post.content}
        </div>

      </div>

    </main>
  );
}