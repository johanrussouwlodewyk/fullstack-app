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

export const createPost = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    // Basic validation for title and content
    if (
      typeof input === "object" &&
      input !== null &&
      "title" in input &&
      typeof input.title === "string" &&
      "content" in input &&
      typeof input.content === "string"
    ) {
      return input as { title: string; content: string };
    }
    return null;
  })
  .handler(async ({ data }) => {
    if (!data) {
      throw new Error("Invalid input for creating a post.");
    }
    const { title, content } = data;
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
      select: { id: true, title: true, content: true, createdAt: true },
    });
    return { post: newPost };
  });
