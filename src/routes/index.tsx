import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold text-slate-900">Home</h1>
      <p className="text-sm text-slate-600">Welcome to the blog.</p>
    </div>
  );
}
