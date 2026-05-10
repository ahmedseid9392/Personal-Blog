"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);

    const response = await fetch("/api/register", {
      method: "POST",

      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to create account.");
      setLoading(false);
      return;
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <main className="max-w-md mx-auto py-20 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Create Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border rounded-xl px-4 py-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded-xl px-4 py-3"
          required
        />

        {error ? (
          <p className="text-sm text-red-600">
            {error}
          </p>
        ) : null}

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-70"
        >
          {loading ? "Creating..." : "Register"}
        </button>

      </form>

    </main>
  );
}
