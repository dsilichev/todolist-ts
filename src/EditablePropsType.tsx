import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type EditablePropsType = {
  title: string;
  onChange: (newValue: string) => void
};
export function EditableSpan(props: EditablePropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  return editMode ? (
    <TextField
      value={title}
      onChange={handleOnChange}
      onBlur={activateViewMode}
      autoFocus
      variant="standard"
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
