import Link from "next/link";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import DeleteButton from "@/components/blog/DeleteButton";

export default async function DashboardPage() {

  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <div className="flex items-center justify-between mb-12">

        <div>
          <h1 className="text-5xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-3">
            Welcome {session.user.name}
          </p>
        </div>

        <Link
          href="/dashboard/create"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Create Post
        </Link>

      </div>

      {posts.length === 0 ? (

        <div className="bg-white border rounded-2xl p-16 text-center">

          <h2 className="text-3xl font-bold">
            No Posts Yet
          </h2>

          <p className="text-gray-500 mt-4">
            Create your first blog post.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {posts.map((post) => (

            <div
              key={post.id}
              className="bg-white border rounded-2xl p-6 flex items-center justify-between"
            >

              <div>

                <p className="text-sm text-blue-600">
                  {post.category}
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {post.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {new Date(post.createdAt).toDateString()}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <Link
                  href={`/dashboard/edit/${post.id}`}
                  className="px-4 py-2 border rounded-lg"
                >
                  Edit
                </Link>

                <DeleteButton postId={post.id} />

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}