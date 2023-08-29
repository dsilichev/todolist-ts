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
  handleOnChangeTodolistTitle: (todolistId: string, newTitle: string) => void
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
        <EditableSpan title={props.title} onChange={handleOnChangeTodolistTitle} />
        <button onClick={handleOnRemoveTodolist}>x</button>
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
            props.handleChangeTitle(t.id, newValue, props.id)
          }
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={handleOnChangeStatus}
              />
              <EditableSpan title={t.title} onChange={handleOnChangeTitle} />
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
