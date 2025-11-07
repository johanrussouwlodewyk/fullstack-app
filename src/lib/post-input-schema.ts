import { z } from "zod";

export const postInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
});

export type PostInput = z.infer<typeof postInputSchema>;
