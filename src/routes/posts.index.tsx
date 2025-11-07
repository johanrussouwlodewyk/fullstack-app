// src/routes/posts.tsx
import { postInputSchema } from "@/lib/post-input-schema";
import { createPost, listPosts } from "@/server/posts";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { FormEvent, useState } from "react";

export const Route = createFileRoute("/posts/")({
  component: PostsPage,
  loader: async () => listPosts(),
});

function PostsPage() {
  const { posts } = Route.useLoaderData();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const createPostFn = useServerFn(createPost);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = postInputSchema.safeParse({ title, content });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your input");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      await createPostFn({ data: { title, content } });
      setTitle("");
      setContent("");
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Render your posts here
  return (
    <div>
      <h1>posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              to="/posts/$id"
              params={{ id: post.id.toString() }}
              className="text-slate-800 underline hover:text-slate-900"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (error) {
                setError(null);
              }
            }}
            className="rounded border border-slate-300 px-3 py-2 text-sm text-slate-900 foucus;border-sate-500 foucus:outline-none"
          />
          <label
            htmlFor="content"
            className="text-sm font-medium text-slate-700"
          >
            Content{" "}
          </label>
          <input
            id="content"
            type="text"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
              if (error) {
                setError(null);
              }
            }}
            className="rounded border border-slate-300 px-3 py-2 text-sm text-slate-900 foucus;border-sate-500 foucus:outline-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className={`rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Adding..." : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

/*import { createFileRoute } from "@tanstack/react-router";

export function Posts() {
  return <h1>Posts Page</h1>;
}

export const Route = createFileRoute("/posts/")({ component: Posts });

*/
