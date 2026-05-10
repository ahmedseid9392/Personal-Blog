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
    <main className="pb-10 pt-8">
      <section className="page-section max-w-5xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white/70 shadow-[0_24px_60px_rgba(34,32,27,0.08)] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="px-8 py-12 sm:px-10 lg:px-12">
            <span className="eyebrow">Create Account</span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-[var(--foreground)]">
              Build your publishing identity with a cleaner, more professional workspace.
            </h1>
            <p className="prose-copy mt-5 text-sm">
              Set up your author account to start sharing technical essays, case studies, and thoughtful product writing.
            </p>
          </div>

          <div className="bg-[linear-gradient(180deg,_rgba(255,255,255,0.8),_rgba(248,245,238,0.96))] px-8 py-12 sm:px-10 lg:px-12">
            <h2 className="text-3xl font-semibold text-[var(--foreground)]">
              Register
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="field"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="field"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="field"
                required
              />

              {error ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <button
                disabled={loading}
                className="btn-primary w-full py-3 disabled:opacity-70"
              >
                {loading ? "Creating..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
