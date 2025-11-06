import { createFileRoute } from "@tanstack/react-router";

export function MostViewed() {
  return <h1>Most Viewed Posts</h1>;
}

export const Route = createFileRoute("/most-viewed")({ component: MostViewed });
