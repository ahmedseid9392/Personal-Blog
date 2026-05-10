"use client";

import { useState } from "react";

export default function CreatePostPage() {

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    const response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(data);

    setLoading(false);
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-10">
        Create Blog Post
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <input
          type="text"
          name="title"
          placeholder="Post title"
          className="w-full border rounded-xl px-4 py-3"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full border rounded-xl px-4 py-3"
        />

        <textarea
          name="excerpt"
          placeholder="Short description"
          className="w-full border rounded-xl px-4 py-3 h-28"
        />

        <textarea
          name="content"
          placeholder="Post content"
          className="w-full border rounded-xl px-4 py-3 h-60"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>

      </form>

    </main>
  );
}