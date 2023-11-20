import React from "react";

import "./app.scss";
import Controller from "./components/Controller";
import TodoBoard from "./components/Todo/TodoBoard";
import EditModal from "./components/EditModal";
import {
  Todo,
  Todos,
  getTodosFromLocal,
  getFilteredTodoType,
  saveTodosToLocal,
} from "./util";

function App() {
  const [pendingTodos, setPendingTodos] = React.useState(
    getFilteredTodoType("pending")
  );

  const [pinnedTodos, setPinnedTodos] = React.useState(
    getFilteredTodoType("pinned")
  );
  const [doneTodos, setDoneTodos] = React.useState(getFilteredTodoType("done"));

  const [editTodo, setEditTodo] = React.useState<Todo | null>(null);

  const onClickTodoEditHandler: (todoId: number) => void = (todoId) => {
    const todo = getTodosFromLocal()[todoId];
    setEditTodo(todo);
  };

  const saveEditOnClickTodoHandler: (todo: Todo) => void = (todo) => {
    const newTodos = getTodosFromLocal();
    newTodos[todo.id] = todo;
    saveTodosToLocal(newTodos);
    setPendingTodos(getFilteredTodoType("pending"));
    setPinnedTodos(getFilteredTodoType("pinned"));

    setEditTodo(null);
  };

  const cancelEditOnClickTodoHandler = () => {
    setEditTodo(null);
  };

  const onSubmitTodosHandler: (newTodo: Todo) => void = (newTodo: Todo) => {
    const currTodos: Todos = getTodosFromLocal();
    currTodos[newTodo.id] = newTodo;
    saveTodosToLocal(currTodos);
    setPendingTodos([...pendingTodos, newTodo]);
  };

  const onChangeTodoCheckHandler: (todo: Todo) => void = (todo) => {
    const currTodos: Todos = getTodosFromLocal();
    currTodos[todo.id] = todo;
    saveTodosToLocal(currTodos);
    setPendingTodos(getFilteredTodoType("pending"));
    setDoneTodos(getFilteredTodoType("done"));
    setPinnedTodos(getFilteredTodoType("pinned"));
  };

  const onClickTodoPinHandler: (todo: Todo) => void = (todo) => {
    const currTodos: Todos = getTodosFromLocal();
    currTodos[todo.id] = todo;
    saveTodosToLocal(currTodos);
    setPendingTodos(getFilteredTodoType("pending"));
    setPinnedTodos(getFilteredTodoType("pinned"));
  };

  const onClickTodoDeleteHandler: (todoId: number) => void = (todoId) => {
    const currTodos: Todos = getTodosFromLocal();
    delete currTodos[todoId];
    saveTodosToLocal(currTodos);
    setPendingTodos(getFilteredTodoType("pending"));
    setDoneTodos(getFilteredTodoType("done"));
    setPinnedTodos(getFilteredTodoType("pinned"));
  };

  const todoSearchHandler: (searchText: string) => void = (searchText) => {
    setPendingTodos(getFilteredTodoType("pending", searchText));
    setDoneTodos(getFilteredTodoType("done", searchText));
    setPinnedTodos(getFilteredTodoType("pinned", searchText));
  };

  const markAllDoneTodoHandler = () => {
    const currTodos: Todos = getTodosFromLocal();
    const newTodos = Object.entries(currTodos).reduce(
      (accumulated: Todos, [key, value]: [string, Todo]) => {
        value.status = "done";
        accumulated[Number(key)] = value;
        return accumulated;
      },
      {}
    );
    saveTodosToLocal(newTodos);
    setPendingTodos(getFilteredTodoType("pending"));
    setDoneTodos(getFilteredTodoType("done"));
    setPinnedTodos(getFilteredTodoType("pinned"));
  };

  const clearTodosHandler = () => {
    sessionStorage.removeItem("todos");
    setPendingTodos(getFilteredTodoType("pending"));
    setDoneTodos(getFilteredTodoType("done"));
    setPinnedTodos(getFilteredTodoType("pinned"));
  };

  return (
    <>
      <Controller
        onSubmitTodosHandler={onSubmitTodosHandler}
        todoSearchHandler={todoSearchHandler}
        markAllDoneTodoHandler={markAllDoneTodoHandler}
        clearTodosHandler={clearTodosHandler}
      />
      <main className="body">
        <TodoBoard
          todos={pendingTodos}
          todoType="pending"
          onChangeTodoCheckHandler={onChangeTodoCheckHandler}
          onClickTodoPinHandler={onClickTodoPinHandler}
          onClickTodoDeleteHandler={onClickTodoDeleteHandler}
          onClickTodoEditHandler={onClickTodoEditHandler}
        />
        <TodoBoard
          todos={pinnedTodos}
          todoType="pinned"
          onChangeTodoCheckHandler={onChangeTodoCheckHandler}
          onClickTodoPinHandler={onClickTodoPinHandler}
          onClickTodoDeleteHandler={onClickTodoDeleteHandler}
          onClickTodoEditHandler={onClickTodoEditHandler}
        />
        <TodoBoard
          todos={doneTodos}
          todoType="done"
          onChangeTodoCheckHandler={onChangeTodoCheckHandler}
          onClickTodoPinHandler={onClickTodoPinHandler}
          onClickTodoDeleteHandler={onClickTodoDeleteHandler}
          onClickTodoEditHandler={onClickTodoEditHandler}
        />
      </main>
      {editTodo !== null ? (
        <EditModal
          todo={editTodo}
          saveOnClickHandler={saveEditOnClickTodoHandler}
          cancelOnClickHandler={cancelEditOnClickTodoHandler}
        />
      ) : null}
    </>
  );
}

export default App;
