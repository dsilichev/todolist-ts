import React, { useState } from "react";
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
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={(e) => {
            setNewTaskTitle(e.currentTarget.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              props.handleAddTask(newTaskTitle);
            setNewTaskTitle("");
            }
          }}
        />
        <button
          onClick={() => {
            props.handleAddTask(newTaskTitle);
            setNewTaskTitle("");
          }}
        >
          +
        </button>
      </div>
      <ul>
        {props.tasks.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <button onClick={() => props.handleRemoveItem(t.id)}>x</button>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            props.handleChangeFilter("all");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            props.handleChangeFilter("active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.handleChangeFilter("completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default Todolist;
