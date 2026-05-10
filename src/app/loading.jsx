export default function Loading() {
  return (
    <div className="page-section flex min-h-[50vh] items-center justify-center py-12">
      <div className="panel rounded-[2rem] px-8 py-10 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[rgba(15,118,110,0.18)] border-t-[var(--accent)]" />
        <p className="mt-5 text-lg font-medium text-[var(--foreground)]">
          Loading your workspace...
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Preparing content and interface details.
        </p>
      </div>
    </div>
  );
}
