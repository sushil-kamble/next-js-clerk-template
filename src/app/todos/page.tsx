"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { fetcher, useFetch } from "@/lib/fetcher";
import { Todo, TodoFormData } from "./types";
import TodoFormDialog from "./TodoFormDialog";
import { TodoList } from "./TodoList";

export default function TodoPage() {
  const [open, setOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const {
    data: todos,
    error,
    isLoading,
    mutate,
  } = useFetch<{
    data: Todo[];
    success: boolean;
  }>("/todo");

  const handleSubmit = async (values: TodoFormData) => {
    try {
      const method = editingTodo ? "PUT" : "POST";

      await fetcher("/todo", {
        method,
        body: JSON.stringify({
          ...values,
          id: editingTodo?.id,
        }),
      });

      toast.success(`Todo ${editingTodo ? "updated" : "created"} successfully`);
      setOpen(false);
      setEditingTodo(null);
      await mutate(); // Refetch todos after mutation
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error creating todo"
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetcher(`/todo?id=${id}`, {
        method: "DELETE",
      });

      toast.success("Todo deleted successfully");
      await mutate(); // Refetch todos after deletion
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error deleting todo"
      );
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setEditingTodo(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Todos</h1>
        <Button onClick={() => setOpen(true)}>Add Todo</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">Error loading todos</div>
      ) : (
        <TodoList
          todos={todos?.data || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <TodoFormDialog
        open={open}
        onOpenChange={handleDialogClose}
        todo={editingTodo}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
