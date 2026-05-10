"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ postId }) {

  const router = useRouter();

  async function handleDelete() {

    const confirmed = confirm(
      "Delete this post?"
    );

    if (!confirmed) return;

    const response = await fetch(
      `/api/posts/${postId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      Delete
    </button>
  );
}