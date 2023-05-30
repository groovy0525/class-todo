export interface Todo {
  id: number;
  text: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestTodo
  extends Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">> {}
