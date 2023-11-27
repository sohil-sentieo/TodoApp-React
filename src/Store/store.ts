import { createStore } from "redux";

import { reducer } from "./reducer";
import { Todo } from "../util";

export interface TodoStore {
  editingTodo: Todo;
  searchText: string;
}

export const store = createStore(reducer);
