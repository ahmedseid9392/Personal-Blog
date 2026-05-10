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
    <main className="pb-10 pt-8">
      <section className="page-section max-w-5xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white/70 shadow-[0_24px_60px_rgba(34,32,27,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.2),_transparent_46%),linear-gradient(180deg,_#163532,_#1f2937)] px-8 py-12 text-white sm:px-10 lg:px-12">
            <span className="eyebrow border-white/20 bg-white/10 text-white">Welcome Back</span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight">
              Sign in to manage your editorial workspace.
            </h1>
            <p className="mt-5 text-sm leading-7 text-white/78">
              Access your dashboard, continue drafting articles, and keep your publishing flow consistent.
            </p>
          </div>

          <div className="px-8 py-12 sm:px-10 lg:px-12">
            <h2 className="text-3xl font-semibold text-[var(--foreground)]">
              Login
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
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
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
