"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="max-w-md mx-auto py-20 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

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
          {loading ? "Signing in..." : "Login"}
        </button>

      </form>

    </main>
  );
}
