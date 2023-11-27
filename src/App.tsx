import React from "react";
import { useSelector } from "react-redux";

import "./app.scss";
import Controller from "./components/Controller";
import TodoBoard from "./components/Todo/TodoBoard";
import EditModal from "./components/EditModal";
import { store } from "./Store/store";
import {
  Todo,
  Todos,
  getTodosFromLocal,
  getFilteredTodoType,
  saveTodosToLocal,
} from "./util";
import { editingTodo } from "./Store/actions";

function App() {
  const [searchText, setSearchText] = React.useState("");

  const [pendingTodos, setPendingTodos] = React.useState(
    getFilteredTodoType("pending")
  );
  const pendingScrollRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const [pendingBoardCurrPage, setPendingBoardCurrPage] = React.useState(1);
  const [pendingBoardPrevPage, setPendingBoardPrevPage] = React.useState(0);

  React.useEffect(() => {
    const fetchData: () => Todo[] = () => {
      const todos: Todo[] = getFilteredTodoType(
        "pending",
        searchText,
        pendingBoardCurrPage
      );
      setPendingBoardPrevPage(pendingBoardCurrPage);
      return todos;
    };
    if (pendingBoardCurrPage != pendingBoardPrevPage) {
      const todos: Todo[] = fetchData();
      setPendingTodos(todos);
    }
  }, [pendingBoardCurrPage, pendingBoardPrevPage, searchText]);

  const pendingBoardOnScroll = () => {
    if (pendingScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        pendingScrollRef.current;
      if (Math.round(scrollTop + clientHeight) >= Math.round(scrollHeight)) {
        setPendingBoardCurrPage(pendingBoardCurrPage + 1);
      }
    }
  };

  const [pinnedTodos, setPinnedTodos] = React.useState(
    getFilteredTodoType("pinned")
  );
  const pinnedScrollRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const [pinnedBoardCurrPage, setPinnedBoardCurrPage] = React.useState(1);
  const [pinnedBoardPrevPage, setPinnedBoardPrevPage] = React.useState(0);

  React.useEffect(() => {
    const fetchData: () => Todo[] = () => {
      const todos: Todo[] = getFilteredTodoType(
        "pinned",
        searchText,
        pinnedBoardCurrPage
      );
      setPinnedBoardPrevPage(pinnedBoardCurrPage);
      return todos;
    };
    if (pinnedBoardCurrPage != pinnedBoardPrevPage) {
      const todos: Todo[] = fetchData();
      setPinnedTodos(todos);
    }
  }, [pinnedBoardCurrPage, pinnedBoardPrevPage, searchText]);

  const pinnedBoardOnScroll = () => {
    if (pinnedScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = pinnedScrollRef.current;
      if (Math.round(scrollTop + clientHeight) >= Math.round(scrollHeight)) {
        setPinnedBoardCurrPage(pinnedBoardCurrPage + 1);
      }
    }
  };
  const [doneTodos, setDoneTodos] = React.useState(getFilteredTodoType("done"));
  const doneScrollRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const [doneBoardCurrPage, setDoneBoardCurrPage] = React.useState(1);
  const [doneBoardPrevPage, setDoneBoardPrevPage] = React.useState(0);

  React.useEffect(() => {
    const fetchData: () => Todo[] = () => {
      const todos: Todo[] = getFilteredTodoType(
        "done",
        searchText,
        doneBoardCurrPage
      );
      setDoneBoardPrevPage(doneBoardCurrPage);
      return todos;
    };
    if (doneBoardCurrPage != doneBoardPrevPage) {
      const todos: Todo[] = fetchData();
      setDoneTodos(todos);
    }
  }, [doneBoardCurrPage, doneBoardPrevPage, searchText]);

  const doneBoardOnScroll = () => {
    if (doneScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = doneScrollRef.current;
      if (Math.round(scrollTop + clientHeight) >= Math.round(scrollHeight)) {
        setDoneBoardCurrPage(doneBoardCurrPage + 1);
      }
    }
  };

  const editTodo = useSelector((state) => state.editingTodo);

  const saveEditOnClickTodoHandler: (todo: Todo) => void = (todo) => {
    const newTodos = getTodosFromLocal();
    newTodos[todo.id] = todo;
    saveTodosToLocal(newTodos);
    setPendingTodos(getFilteredTodoType("pending"));
    setPinnedTodos(getFilteredTodoType("pinned"));

    // setEditTodo(null);
    store.dispatch(editingTodo(null));
  };

  const cancelEditOnClickTodoHandler = () => {
    // setEditTodo(null);
    store.dispatch(editingTodo(null));
  };

  const onSubmitTodosHandler: (newTodo: Todo) => void = (newTodo: Todo) => {
    const currTodos: Todos = getTodosFromLocal();
    currTodos[newTodo.id] = newTodo;
    saveTodosToLocal(currTodos);
    setPendingTodos(getFilteredTodoType("pending"));
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
    setSearchText(searchText);
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
          scrollRef={pendingScrollRef}
          onScroll={pendingBoardOnScroll}
        />
        <TodoBoard
          todos={pinnedTodos}
          todoType="pinned"
          onChangeTodoCheckHandler={onChangeTodoCheckHandler}
          onClickTodoPinHandler={onClickTodoPinHandler}
          onClickTodoDeleteHandler={onClickTodoDeleteHandler}
          scrollRef={pinnedScrollRef}
          onScroll={pinnedBoardOnScroll}
        />
        <TodoBoard
          todos={doneTodos}
          todoType="done"
          onChangeTodoCheckHandler={onChangeTodoCheckHandler}
          onClickTodoPinHandler={onClickTodoPinHandler}
          onClickTodoDeleteHandler={onClickTodoDeleteHandler}
          scrollRef={doneScrollRef}
          onScroll={doneBoardOnScroll}
        />
      </main>
      {editTodo !== null && editTodo !== undefined ? (
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
