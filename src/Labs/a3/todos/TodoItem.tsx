import React from "react";

type TodoType = {
  title: string;
  done: boolean;
  status: string;
};

const TodoItem = ({ todo }: { todo: TodoType }) => {
  return (
    <li className={`list-group-item ${todo.done ? "done" : ""}`}>
      <input type="checkbox" className="me-2" defaultChecked={todo.done} />
      {todo.title} ({todo.status})
    </li>
  );
};

export default TodoItem;
