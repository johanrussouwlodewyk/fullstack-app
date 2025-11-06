import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="flex items-center gap-4 border-slate-200 bg-white/80 py-3 text-sm text-slate-600 backdrop-blur">
      <Link
        to="/"
        className="font-medium transition-colors hover:text-slate-900 "
      >
        Home
      </Link>
      <Link
        to="/posts"
        className="font-medium transition-colors hover:text-slate-900 "
      >
        Posts
      </Link>
      <Link
        to="/most-viewed"
        className="font-medium transition-colors hover:text-slate-900 "
      >
        Most Viewed
      </Link>
    </header>
  );
}
