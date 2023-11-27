import * as actions from "./actionTypes";

import { Todo } from "../util";

export const editingTodo: (todo: Todo | null) => actions.EditingTodoAction = (
  todo
) => {
  return {
    type: actions.TODO_EDIT,
    payload: {
      editingTodo: todo,
    },
  };
};
