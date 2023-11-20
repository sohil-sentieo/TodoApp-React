export type todoStatus = "done" | "pending" | "pinned";

export interface Todo {
  id: number;
  status: todoStatus;
  text: string;
  createdAt: Date;
}

export interface Todos {
  [key: number]: Todo;
}

export const getTodosFromLocal = (): Todos => {
  const todoItems = sessionStorage.getItem("todos");
  return todoItems === null ? {} : JSON.parse(todoItems);
};

export const saveTodosToLocal = (todos: Todos): void => {
  sessionStorage.setItem("todos", JSON.stringify(todos));
};

export const getFilteredTodoType: (
  todoType: todoStatus,
  searchText?: string,
  pageNum?: number,
  pageSize?: number
) => Todo[] = (
  todoType,
  searchText = "",
  pageNum = 1,
  pageSize = 10
): Todo[] => {
  return Object.entries(getTodosFromLocal())
    .filter(
      ([, value]) =>
        value["status"] === todoType &&
        value.text.toLowerCase().includes(searchText.toLowerCase())
    )
    .map(([, value]) => value)
    .slice((pageNum - 1) * pageSize, pageNum * pageSize);
};

export const formatDateToCustomFormat: (date: Date) => string = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear().toString().slice(-2);

  const customFormat = `${day}-${month}-${year}`;

  return customFormat;
};
