import React from "react";
import "./App.css";
import Todolist from "./Todolist";
import type { TaskType } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";

export type FilterValueType = "all" | "completed" | "active";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};
function App() {
  // let tasks2: Array<TaskType> = [
  //   {id: 1, title: 'X Men', isDone: true},
  //   {id: 2, title: 'Mission Impossible', isDone: true},
  //   {id: 3, title: 'Mummy', isDone: true},
  // ]

  // const [tasks, setTasks] = useState<Array<TaskType>>([
  //   { id: v1(), title: "CSS", isDone: true },
  //   { id: v1(), title: "JS", isDone: true },
  //   { id: v1(), title: "React", isDone: false },
  // ]);

  const handleChangeFilter = (value: FilterValueType, todolistId: string) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  };

  const handleRemoveItem = (id: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    let filterdTasks = tasks.filter((task) => task.id !== id);
    tasksObj[todolistId] = filterdTasks;
    setTasks({ ...tasksObj });
  };

  const handleAddTask = (title: string, todolistId: string) => {
    let newTask: TaskType = { id: v1(), title, isDone: false };
    const tasks = tasksObj[todolistId];
    const newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  };

  const handleChangeStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    const tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      tasksObj[todolistId] = tasks;
    }
    setTasks({...tasksObj});
  };

  const handleRemoveTodolist = (todolistId:string) => {
    let filterdTodolist = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filterdTodolist);
    delete tasksObj[todolistId];
    setTasks({...tasksObj});
  }

  const todolistId1 = v1();
  const todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "What to learn", filter: "active" },
    { id: todolistId2, title: "What to buy", filter: "completed" },
  ]);

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Milk", isDone: false },
    ],
  });

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];
        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }
        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            handleRemoveItem={handleRemoveItem}
            handleChangeFilter={handleChangeFilter}
            handleAddTask={handleAddTask}
            handleChangeStatus={handleChangeStatus}
            filter={tl.filter}
            handleOnRemoveTodolist={handleRemoveTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
