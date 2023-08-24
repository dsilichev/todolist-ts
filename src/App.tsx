import React from "react";
import "./App.css";
import Todolist from "./Todolist";
import type { TaskType } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";

export type FilterValueType = "all" | "completed" | "active";

function App() {
  // let tasks2: Array<TaskType> = [
  //   {id: 1, title: 'X Men', isDone: true},
  //   {id: 2, title: 'Mission Impossible', isDone: true},
  //   {id: 3, title: 'Mummy', isDone: true},
  // ]

  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValueType>("all");

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  const handleChangeFilter = (value: FilterValueType) => {
    setFilter(value);
  };

  const handleRemoveItem = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddTask = (title: string) => {
    let newTask: TaskType = { id: v1(), title, isDone: false };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodoList}
        handleRemoveItem={handleRemoveItem}
        handleChangeFilter={handleChangeFilter}
        handleAddTask={handleAddTask}
      />
      {/* <Todolist title='Movies' tasks={tasks2} handleRemoveItem={handleRemoveItem} /> */}
    </div>
  );
}

export default App;
