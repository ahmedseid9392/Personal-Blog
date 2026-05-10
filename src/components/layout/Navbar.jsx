import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500"
        >
          DevBlog
        </Link>

        <div className="flex items-center gap-6 text-black">
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/about">About</Link>

          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}