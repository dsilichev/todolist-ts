import { CheckBox, Delete } from "@mui/icons-material";
import { Button, Checkbox, IconButton } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import React, { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { FilterValueType } from "./App";
import { EditableSpan } from "./EditablePropsType";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  handleRemoveItem: (id: string, todolistId: string) => void;
  handleChangeFilter: (value: FilterValueType, todolistId: string) => void;
  handleAddTask: (title: string, todolistId: string) => void;
  handleChangeStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  filter: FilterValueType;
  handleOnRemoveTodolist: (todolistId: string) => void;
  handleOnChangeTodolistTitle: (todolistId: string, newTitle: string) => void;
  handleChangeTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
};

function Todolist(props: PropsType) {
  const handleOnAllFilter = () => {
    props.handleChangeFilter("all", props.id);
  };
  const handleOnCompletedFilter = () => {
    props.handleChangeFilter("completed", props.id);
  };
  const handleOnActiveFilter = () => {
    props.handleChangeFilter("active", props.id);
  };

  const handleOnRemoveTodolist = () => {
    props.handleOnRemoveTodolist(props.id);
  };

  const handleOnChangeTodolistTitle = (newTitle: string) => {
    props.handleOnChangeTodolistTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.handleAddTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan
          title={props.title}
          onChange={handleOnChangeTodolistTitle}
        />
        <IconButton onClick={handleOnRemoveTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((t) => {
          const handleOnRemove = () => {
            props.handleRemoveItem(t.id, props.id);
          };
          const handleOnChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.handleChangeStatus(t.id, e.currentTarget.checked, props.id);
          };
          const handleOnChangeTitle = (newValue: string) => {
            props.handleChangeTitle(t.id, newValue, props.id);
          };
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox checked={t.isDone} onChange={handleOnChangeStatus} />
              <EditableSpan title={t.title} onChange={handleOnChangeTitle} />
              <IconButton onClick={handleOnRemove}>
                <Delete />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={handleOnAllFilter}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={handleOnActiveFilter}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={handleOnCompletedFilter}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}

export default Todolist;
