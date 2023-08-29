import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

export type AddItemFormType = {
  addItem: (title: string) => void;
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
      <TextField
        variant="outlined"
        label="Type label"
        value={newTaskTitle}
        onChange={handleOnNewTitleChange}
        onKeyPress={handleOnKeyPress}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color={"primary"}>
        <ControlPoint />
      </IconButton>
    </div>
  );
}
