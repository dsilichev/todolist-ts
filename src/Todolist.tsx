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
  handleAddTask: (title: string) => void;
  handleChangeStatus: (taskId: string, isDone: boolean) => void;
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
    props.handleAddTask(newTaskTitle.trim());
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
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const handleOnRemove = () => {
            props.handleRemoveItem(t.id);
          };
          const handleOnChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.handleChangeStatus(t.id, e.currentTarget.checked);
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
