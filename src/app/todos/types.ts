import { z } from "zod";
import { todo } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

// Type for selecting todos
export type Todo = InferSelectModel<typeof todo>;
export type TodoStatus = "pending" | "completed" | "in_progress";

export interface TodoFormData {
  id?: string;
  title: string;
  description?: string;
  status: TodoStatus;
  due_date?: Date;
}

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["pending", "completed", "in_progress"]).default("pending"),
  due_date: z.date().optional(),
});
