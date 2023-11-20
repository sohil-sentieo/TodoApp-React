import React from "react";
import { Todo } from "../../util";

export default function TodoHeader({
  todo,
  todoLabel,
  onChangeTodoCheckHandler,
  onClickTodoPinHandler,
  onClickTodoDeleteHandler,
  onClickTodoEditHandler,
}: {
  todo: Todo;
  todoLabel: number;
  onChangeTodoCheckHandler: (todo: Todo) => void;
  onClickTodoPinHandler: (todo: Todo) => void;
  onClickTodoDeleteHandler: (todoId: number) => void;
  onClickTodoEditHandler: (todoId: number) => void;
}) {
  const status = todo.status;
  const oncheckHandler: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    const newStatus = event.target.checked ? "done" : "pending";
    todo.status = newStatus;
    onChangeTodoCheckHandler(todo);
  };

  const onClickPinHandler: (pinned: boolean) => void = (pinned) => {
    todo.status = pinned ? "pinned" : "pending";
    onClickTodoPinHandler(todo);
  };

  const onDeleteHandler = () => {
    onClickTodoDeleteHandler(todo.id);
  };

  const editOnClickHandler = () => {
    onClickTodoEditHandler(Number(todo.id));
  };

  return (
    <>
      <div className="todo-list pending-todo-list">
        <div>
          <div className="todo-header">
            <div>
              <span>{todoLabel}</span>
              <input
                onChange={oncheckHandler}
                type="checkbox"
                checked={status === "done" ? true : false}
              ></input>
            </div>
            <div>
              {status !== "done" ? (
                <button onClick={editOnClickHandler} className="success-button">
                  Edit
                </button>
              ) : null}
              {status === "pending" ? (
                <button
                  className="success-button"
                  onClick={() => onClickPinHandler(true)}
                >
                  Pin
                </button>
              ) : null}
              {status === "pinned" ? (
                <button
                  className="success-button"
                  onClick={() => onClickPinHandler(false)}
                >
                  Unpin
                </button>
              ) : null}
              <button className="danger-button" onClick={onDeleteHandler}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
