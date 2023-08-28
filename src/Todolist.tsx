import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "./App";

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
  handleChangeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValueType;
};

function Todolist(props: PropsType) {
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
    props.handleAddTask(newTaskTitle.trim(), props.id);
    setNewTaskTitle("");
  };

  const handleOnAllFilter = () => {
    props.handleChangeFilter("all", props.id);
  };
  const handleOnCompletedFilter = () => {
    props.handleChangeFilter("completed", props.id);
  };
  const handleOnActiveFilter = () => {
    props.handleChangeFilter("active", props.id);
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={handleOnNewTitleChange}
          onKeyPress={handleOnKeyPress}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const handleOnRemove = () => {
            props.handleRemoveItem(t.id, props.id);
          };
          const handleOnChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.handleChangeStatus(t.id, e.currentTarget.checked, props.id);
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={handleOnChangeStatus}
              />
              <span>{t.title}</span>
              <button onClick={handleOnRemove}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={handleOnAllFilter}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={handleOnActiveFilter}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={handleOnCompletedFilter}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default Todolist;
