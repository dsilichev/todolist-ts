import React from "react";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
};

function Todolist(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        <li>
          <input type="checkbox" checked={true} />
          <span>CSS&HTML</span>
        </li>
        <li>
          <input type="checkbox" checked={true} />
          <span>JS</span>
        </li>
        <li>
          <input type="checkbox" checked={true} />
          <span>React</span>
        </li>
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
}

export default Todolist;
export type { TaskType };


