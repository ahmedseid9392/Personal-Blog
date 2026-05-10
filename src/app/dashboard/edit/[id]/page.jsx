import { prisma } from "@/lib/prisma";

export default async function EditPostPage({ params }) {

  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-10">
        Edit Post
      </h1>

      <form className="space-y-6">

        <input
          type="text"
          defaultValue={post.title}
          className="w-full border rounded-xl px-4 py-3"
        />

        <textarea
          defaultValue={post.content}
          className="w-full border rounded-xl px-4 py-3 h-60"
        />

        <button className="bg-black text-white px-6 py-3 rounded-xl">
          Update Post
        </button>

      </form>

    </main>
  );
}