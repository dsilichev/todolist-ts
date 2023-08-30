import React from "react";
import "./App.css";
import Todolist from "./Todolist";
import type { TaskType } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";

export type FilterValueType = "all" | "completed" | "active";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
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
    setTasks({ ...tasksObj });
  };

  const handleChangeTitle = (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => {
    const tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      tasksObj[todolistId] = tasks;
    }
    setTasks({ ...tasksObj });
  };

  const handleRemoveTodolist = (todolistId: string) => {
    let filterdTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(filterdTodolist);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  };
  const handleOnChangeTodolistTitle = (
    todolistId: string,
    newTitle: string
  ) => {
    const todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  };

  const todolistId1 = v1();
  const todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let [tasksObj, setTasks] = useState<TasksStateType>({
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

  const addTodolist = (title: string) => {
    const todolist: TodoListType = {
      id: v1(),
      filter: "all",
      title,
    };
    setTodolists([todolist, ...todolists]);
    setTasks({ ...tasksObj, [todolist.id]: [] });
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid container style={{padding: '10px'}}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let tasksForTodoList = tasksObj[tl.id];
            if (tl.filter === "completed") {
              tasksForTodoList = tasksForTodoList.filter(
                (t) => t.isDone === true
              );
            }
            if (tl.filter === "active") {
              tasksForTodoList = tasksForTodoList.filter(
                (t) => t.isDone === false
              );
            }
            return (
              <Grid item>
                <Paper style={{padding: '10px'}}>
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
                    handleChangeTitle={handleChangeTitle}
                    handleOnChangeTodolistTitle={handleOnChangeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
