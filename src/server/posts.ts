import prisma from "../lib/prisma"; // Adjust path as needed
import { createServerFn } from "@tanstack/react-start";

export const listPosts = createServerFn().handler(async () => {
  const posts = await prisma.post.findMany();
  return { posts };
});

export const getPostById = createServerFn()
  .inputValidator((id: unknown) => {
    if (typeof id === "number" && Number.isInteger(id) && id > 0) {
      return id;
    }
    return null;
  })
  .handler(async ({ data }) => {
    const id = data as number | null;
    if (id === null) return null;

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return null;

    return { post };
  });
