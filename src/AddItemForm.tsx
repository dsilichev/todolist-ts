import React, { ChangeEvent, KeyboardEvent, useState } from "react";

export type AddItemFormType = {
  addItem: (title:string) => void,
};

export function AddItemForm(props: AddItemFormType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleOnNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setError("Field is required");
      return;
    }
    props.addItem(newTaskTitle.trim());
    setNewTaskTitle("");
  };

  return (
    <div>
      <input
        value={newTaskTitle}
        onChange={handleOnNewTitleChange}
        onKeyPress={handleOnKeyPress}
        className={error ? "error" : ""} />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
