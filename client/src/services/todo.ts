import { api } from ".";
import { RequestTodo, Todo } from "../types/todo";

export default class TodoService {
  async getTodoList(): Promise<Todo[]> {
    const result = await api("todos");
    return result.json();
  }

  async addTodo(text: string): Promise<Todo> {
    const result = await api("todos", "POST", { text });
    return result.json();
  }

  async updateTodo(id: number, body: RequestTodo): Promise<boolean> {
    const result = await api(`todos/${id}`, "PUT", body);
    return result.json();
  }

  async removeTodo(id: number): Promise<boolean> {
    const result = await api(`todos/${id}`, "DELETE");
    return result.json();
  }
}
