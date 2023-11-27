import { Todo } from "../util";

export const TEXT_SEARCH = "textSearch";
export const TODO_EDIT = "todoEdit";

export interface EditingTodoAction {
  type: typeof TODO_EDIT;
  payload: {
    editingTodo: Todo | null;
  };
}

export interface SearchTodoAction {
  type: typeof TEXT_SEARCH;
  payload: {
    searchText: string;
  };
}

export type Actions = EditingTodoAction | SearchTodoAction;
