import TodoHeader from "./TodoHeader";
import TodoBody from "./TodoBody";
import TodoFooter from "./TodoFooter";
import { Todo } from "../../util";

export default function TodoCard({
  todo,
  todoLabel,
  onChangeTodoCheckHandler,
  onClickTodoPinHandler,
  onClickTodoDeleteHandler,
}: {
  todo: Todo;
  todoLabel: number;
  onChangeTodoCheckHandler: (todo: Todo) => void;
  onClickTodoPinHandler: (todo: Todo) => void;
  onClickTodoDeleteHandler: (todoId: number) => void;
}) {
  return (
    <div className="todo-card">
      <TodoHeader
        todo={todo}
        todoLabel={todoLabel}
        onChangeTodoCheckHandler={onChangeTodoCheckHandler}
        onClickTodoPinHandler={onClickTodoPinHandler}
        onClickTodoDeleteHandler={onClickTodoDeleteHandler}
      />
      <TodoBody text={todo.text} />
      <TodoFooter date={todo.createdAt} />
    </div>
  );
}
