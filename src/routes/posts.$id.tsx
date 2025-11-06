import { getPostById } from "@/server/posts";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const id = Number(params.id);
    const result = await getPostById({ data: id });
    if (!result || !result.post) throw notFound();
    return result;
  },
});

function RouteComponent() {
  const { post } = Route.useLoaderData();
  return (
    <div>
      <h1 className="text-2xl font-semibold">{post.title}</h1>
      <p className="text-slate-600">{post.content}</p>
    </div>
  );
}
