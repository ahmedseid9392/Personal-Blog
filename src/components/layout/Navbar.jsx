"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/create", label: "Write" },
  ];

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <nav className="page-section panel flex flex-col gap-4 rounded-[1.75rem] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#115e59_0%,#0f766e_100%)] text-lg font-bold text-white shadow-[0_14px_28px_rgba(15,118,110,0.26)]">
            DB
          </span>

          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              Editorial Suite
            </span>
            <span className="block text-xl font-semibold text-[var(--foreground)]">
              DevBlog
            </span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 rounded-full border border-[var(--border)] bg-white/65 p-1.5">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  active
                    ? "bg-[var(--foreground)] text-white shadow-sm"
                    : "text-[var(--muted)] hover:bg-white hover:text-[var(--foreground)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {session ? (
            <>
              <div className="rounded-full border border-[var(--border)] bg-white/72 px-4 py-2 text-sm text-[var(--muted)]">
                Signed in as{" "}
                <span className="font-semibold text-[var(--foreground)]">
                  {session.user.name || session.user.email}
                </span>
              </div>

              <button
                onClick={() => signOut()}
                className="btn-secondary px-5 py-2.5 text-sm font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent-strong)]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="btn-primary px-5 py-2.5 text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
