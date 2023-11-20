import TodoCard from "./TodoCard";
import { Todo, getFilteredTodoType, todoStatus } from "../../util";
import React from "react";

export default function TodoBoard({
  todos,
  todoType,
  onChangeTodoCheckHandler,
  onClickTodoPinHandler,
  onClickTodoDeleteHandler,
  onClickTodoEditHandler,
}: {
  todos: Todo[];
  todoType: todoStatus;
  onChangeTodoCheckHandler: (todo: Todo) => void;
  onClickTodoPinHandler: (todo: Todo) => void;
  onClickTodoDeleteHandler: (todoId: number) => void;
  onClickTodoEditHandler: (todoId: number) => void;
}) {
  const header: string = `${todoType} Items`;
  const scrollRef: React.RefObject<HTMLDivElement> = React.useRef();

  const [currPage, setCurrPage] = React.useState(1);

  const onScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

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
