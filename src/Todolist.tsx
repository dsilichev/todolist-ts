import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  handleRemoveItem: (id: string) => void;
  handleChangeFilter: (value: FilterValueType) => void;
  handleAddTask: Function;
};

function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleOnNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  const addTask = () => {
    props.handleAddTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const handleOnAllFilter = () => {
    props.handleChangeFilter("all");
  };
  const handleOnCompletedFilter = () => {
    props.handleChangeFilter("completed");
  };
  const handleOnActiveFilter = () => {
    props.handleChangeFilter("active");
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={handleOnNewTitleChange}
          onKeyPress={handleOnKeyPress}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => {
          const handleOnRemove = () => {
            props.handleRemoveItem(t.id);
          };

          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={handleOnRemove}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={handleOnAllFilter}>All</button>
        <button onClick={handleOnActiveFilter}>Active</button>
        <button onClick={handleOnCompletedFilter}>Completed</button>
      </div>
    </div>
  );
}

export default Todolist;
