import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onEdit, onDelete }: TodoItemProps) {
  return (
    <div className="p-4 border rounded-lg flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{todo.title}</h3>
        <p className="text-sm text-gray-500">{todo.description}</p>
        <div className="flex gap-2 mt-2">
          <span className="text-xs bg-blue-100 px-2 py-1 rounded">
            {todo.status}
          </span>
          {todo.due_date && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {format(new Date(todo.due_date), "PPP")}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(todo)}>
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
