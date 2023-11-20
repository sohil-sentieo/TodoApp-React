import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Todo } from "../util";
import React from "react";

export default function EditModal({
  todo,
  saveOnClickHandler,
  cancelOnClickHandler,
}: {
  todo: Todo;
  saveOnClickHandler: (todo: Todo) => void;
  cancelOnClickHandler: () => void;
}) {
  const [inputText, setInputText] = React.useState(todo.text);

  const saveEditOnClickHandler: () => void = () => {
    todo.text = inputText;
    saveOnClickHandler(todo);
  };

  const inputOnChangeHandler = (event, editor) => {
    setInputText(editor.getData());
  };

  return (
    <>
      <div className="modal">
        <div className="modal__content">
          <CKEditor
            editor={ClassicEditor}
            onChange={inputOnChangeHandler}
            data={todo.text}
          />
        </div>
        <div>
          <button onClick={saveEditOnClickHandler} className="button">
            Save
          </button>
          <button
            onClick={cancelOnClickHandler}
            className="button button__danger"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
}
