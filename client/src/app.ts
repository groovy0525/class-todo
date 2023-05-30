import TodoService from "./services/todo";
import { RequestTodo, Todo } from "./types/todo";

const todoService = new TodoService();

class App {
  private appEl: HTMLDivElement | null = null;
  private todoFormEl: HTMLFormElement | null | undefined = null;
  private todoListEl: HTMLUListElement | null | undefined = null;
  private todoInputEl: HTMLInputElement | null | undefined = null;
  private todoList: Todo[] = [];

  constructor() {
    this.assignElement();
    this.addEvent();
    this.getTodos();
  }

  private assignElement() {
    this.appEl = document.querySelector<HTMLDivElement>("#app");
    this.todoFormEl = this.appEl?.querySelector<HTMLFormElement>(".todo-form");
    this.todoListEl = this.appEl?.querySelector<HTMLUListElement>(".todo-list");
    this.todoInputEl =
      this.todoFormEl?.querySelector<HTMLInputElement>("input");
  }

  private addEvent() {
    this.todoFormEl?.addEventListener("submit", this.createTodo.bind(this));
    this.todoListEl?.addEventListener("click", (event) => {
      const target = event.target as HTMLLIElement | HTMLButtonElement;

      if (target.nodeName !== "LI" && target.nodeName !== "BUTTON") {
        return;
      }

      if (target.nodeName === "LI") {
        const id = target.dataset.id;

        if (!id) return;

        const intId = parseInt(id, 10);
        const todo = this.todoList.find((todo) => todo.id === intId);

        if (!todo) return;

        this.updateTodo({ id: intId, todo: { isDone: !todo.isDone } });
      }

      const listItem = target.closest("li");

      const id = listItem?.dataset.id;

      if (!id) return;

      const intId = parseInt(id, 10);

      if (target.classList.contains("modify-button")) {
        const text = prompt("수정하고 싶은 text를 입력해 주세요.");

        if (text) {
          this.updateTodo({ id: intId, todo: { text } });
        }
      }

      if (target.classList.contains("remove-button")) {
        const isDelete = confirm("정말 삭제하시겠습니까?");

        if (isDelete) {
          this.removeTodo(intId);
        }
      }
    });
  }

  private async createTodo(event: SubmitEvent) {
    event.preventDefault();

    const value = this.todoInputEl?.value;

    if (!value) return;

    const result = await todoService.addTodo(value);

    if (result.id) {
      this.getTodos();
    }
  }

  private async getTodos() {
    const result = await todoService.getTodoList();
    this.todoList = result;

    this.render();
  }

  private async updateTodo({ id, todo }: { id: number; todo: RequestTodo }) {
    const result = await todoService.updateTodo(id, todo);

    if (result) {
      this.getTodos();
    }
  }

  private async removeTodo(id: number) {
    const result = await todoService.removeTodo(id);

    if (result) {
      this.getTodos();
    }
  }

  private generateItem(todo: Todo) {
    return `
      <li data-id=${todo.id}>
        <input type="checkbox" ${todo.isDone ? "checked" : ""} readonly />
        <span>${todo.text}</span>
        <div class="button-group">
          <button class="modify-button">수정하기</button>
          <button class="remove-button">삭제하기</button>
        </div>
      </li>
    `;
  }

  private async render() {
    const todos = this.todoList.map((todo) => this.generateItem(todo));

    if (!this.todoListEl) return;

    this.todoListEl.innerHTML = todos.join("");
  }
}

export default App;
