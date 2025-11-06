// src/routes/posts.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import prisma from "../lib/prisma"; // Adjust path as needed

export const Route = createFileRoute("/posts/")({
  loader: async () => {
    const posts = await prisma.post.findMany();
    return { posts };
  },
  component: postsComponent,
});

function postsComponent() {
  const { posts } = Route.useLoaderData();
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
    </div>
  );
}

/*import { createFileRoute } from "@tanstack/react-router";

export function Posts() {
  return <h1>Posts Page</h1>;
}

export const Route = createFileRoute("/posts/")({ component: Posts });

*/
