import TodoCard from "./TodoCard";
import { Todo, todoStatus } from "../../util";
import React from "react";

export default function TodoBoard({
  todos,
  todoType,
  onChangeTodoCheckHandler,
  onClickTodoPinHandler,
  onClickTodoDeleteHandler,
  onClickTodoEditHandler,
  onScroll,
  scrollRef,
}: {
  todos: Todo[];
  todoType: todoStatus;
  onChangeTodoCheckHandler: (todo: Todo) => void;
  onClickTodoPinHandler: (todo: Todo) => void;
  onClickTodoDeleteHandler: (todoId: number) => void;
  onClickTodoEditHandler: (todoId: number) => void;
  onScroll: () => void;
  scrollRef: React.RefObject<HTMLDivElement>;
}) {
  const header: string = `${
    todoType.charAt(0).toUpperCase() + todoType.slice(1)
  } Items`;

  return (
    <>
      <div className="todo-board" onScroll={onScroll} ref={scrollRef}>
        <h3>{header}</h3>
        {todos.map((todo, idx) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            todoLabel={idx + 1}
            onChangeTodoCheckHandler={onChangeTodoCheckHandler}
            onClickTodoPinHandler={onClickTodoPinHandler}
            onClickTodoDeleteHandler={onClickTodoDeleteHandler}
            onClickTodoEditHandler={onClickTodoEditHandler}
          />
        ))}
      </div>
    </>
  );
}
