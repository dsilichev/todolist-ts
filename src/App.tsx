import React from 'react';
import './App.css';
import Todolist  from './Todolist';
import type { TaskType } from './Todolist';
import { useState } from 'react';

function App() {

  let tasks1: Array<TaskType> = [
    {id: 1, title: 'CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'React', isDone: true},
  ]

  let tasks2: Array<TaskType> = [
    {id: 1, title: 'X Men', isDone: true},
    {id: 2, title: 'Mission Impossible', isDone: true},
    {id: 3, title: 'Mummy', isDone: true},
  ]

  const [tasks, setTasks] = useState(tasks1);

  const handleRemoveItem = (id: number) => {
    setTasks(
      tasks.filter(task => task.id !== id)
    )
  }

  return (
    <div className="App">
      <Todolist title='What to learn' tasks={tasks} handleRemoveItem={handleRemoveItem}/>
      <Todolist title='Movies' tasks={tasks2} handleRemoveItem={handleRemoveItem} />
    </div>
  );
}

export default App;
