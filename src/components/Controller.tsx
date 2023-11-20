import React from "react";

import { Todo } from "../util";

export default function Controller({
  onSubmitTodosHandler,
  todoSearchHandler,
  markAllDoneTodoHandler,
  clearTodosHandler,
}: {
  onSubmitTodosHandler: (newTodos: Todo) => void;
  todoSearchHandler: (searchText: string) => void;
  markAllDoneTodoHandler: () => void;
  clearTodosHandler: () => void;
}) {
  const [inputText, setInputText] = React.useState("");
  const [searchText, setSearchText] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const onSubmitSearchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    todoSearchHandler(searchText);
  };

  const onClickResetSearchHandler = () => {
    setSearchText("");
    todoSearchHandler("");
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todoItem: Todo = {
      id: Date.now(),
      status: "pending",
      text: inputText,
      createdAt: new Date(),
    };
    setInputText("");
    onSubmitTodosHandler(todoItem);
  };

  return (
    <>
      <header className="header">
        <h1 className="app-header">TodoList</h1>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            placeholder="Add Item"
            className="input"
            value={inputText}
            onChange={handleInputChange}
          />
          <button className="button" type="submit">
            Add
          </button>
        </form>
        <form onSubmit={onSubmitSearchHandler}>
          <input
            type="text"
            placeholder="Search"
            className="input"
            id="search-todo-input"
            value={searchText}
            onChange={handleSearchInputChange}
          ></input>
          <button className="button">Search</button>
          <button className="button" onClick={onClickResetSearchHandler}>
            Reset
          </button>
        </form>
        <div>
          <button className="button" onClick={markAllDoneTodoHandler}>
            Mark all as done
          </button>
          <button className="button button__danger" onClick={clearTodosHandler}>
            Clear all todos
          </button>
        </div>
      </header>
    </>
  );
}
