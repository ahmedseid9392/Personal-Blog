export default function Footer() {
  return (
    <footer className="mt-20 px-4 pb-8 sm:px-6">
      <div className="page-section panel rounded-[2rem] px-6 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
              DevBlog
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
              Publish clear ideas with a polished editorial workspace.
            </h2>
          </div>

          <div className="text-sm text-[var(--muted)]">
            <p>Built for thoughtful writing, practical notes, and modern engineering stories.</p>
            <p className="mt-2">© 2026 Personal Blog. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
