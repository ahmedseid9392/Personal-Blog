import Link from "next/link";

export default function BlogCard({ post }) {

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-md transition">

      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <span className="text-sm text-blue-600 font-medium">
          {post.category}
        </span>

        <h2 className="text-2xl font-bold mt-2">
          {post.title}
        </h2>

        <p className="text-gray-600 mt-3">
          {post.excerpt}
        </p>

        <Link
          href={`/blogs/${post.slug}`}
          className="inline-block mt-5 text-black font-semibold"
        >
          Read More →
        </Link>

      </div>
    </article>
  );
}