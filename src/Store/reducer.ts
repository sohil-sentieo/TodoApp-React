import * as actions from "./actionTypes";

export const reducer = (state = {}, action: actions.Actions) => {
  switch (action.type) {
    case actions.TEXT_SEARCH:
      return state;
    case actions.TODO_EDIT:
      return { ...state, editingTodo: action.payload.editingTodo };
    default:
      return state;
  }
};
