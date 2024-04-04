import React, { useState, useEffect } from "react";
import axios from "axios";

function WorkingWithArrays() {
  const API = "http://localhost:4000/a5/todos";
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };

  const fetchTodoById = async (id) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };

  const removeTodo = async (todo) => {
    const response = await axios.get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
  };

  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };

  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };

  const [errorMessage, setErrorMessage] = useState(null);
  const deleteTodo = async (todo) => {
    try {
      const response = await axios.delete(`${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  const updateTodo = async () => {
    try {
      const response = await axios.put(`${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
      )}
      <h3>Working with Arrays</h3>
      <input
        type="number"
        value={todo.id}
        onChange={(e) =>
          setTodo({
            ...todo,
            id: e.target.value,
          })
        }
      />
      <input
        type="text"
        value={todo.title}
        onChange={(e) =>
          setTodo({
            ...todo,
            title: e.target.value,
          })
        }
      />
      <h3>Updating an Item in an Array</h3>
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Title to {todo.title}
      </a>
      <h4>Retrieving Arrays</h4>
      <a className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <h4>Retrieving an Item from an Array by ID</h4>
      <input
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <a className="btn btn-primary" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <h3>Filtering Array Items</h3>
      <a className="btn btn-primary" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <h3>Deleting from an Array</h3>
      <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>
      <h3>Completed Todo</h3>
      <label>
        Completed:
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) =>
            setTodo({
              ...todo,
              completed: e.target.checked,
            })
          }
        />
      </label>
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Mark as {todo.completed ? "Incomplete" : "Complete"}
      </a>
      <h3>Describe Todo</h3>
      <input
        type="text"
        value={todo.description}
        placeholder="Edit Description"
        onChange={(e) =>
          setTodo({
            ...todo,
            description: e.target.value,
          })
        }
      />
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/description/${todo.description}`}
      >
        Update Description
      </a>
      <h3>Creating new Items in an Array</h3>
      <button className="btn btn-primary" onClick={createTodo}>
        Create Todo
      </button>{" "}
      <button className="btn btn-success" onClick={updateTitle}>
        Update Title
      </button>
      <h2>Working with Arrays</h2>
      <div>
        <input value={todo.id} readOnly />
      </div>
      <div>
        <input
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          value={todo.title}
          type="text"
        />
      </div>
      <div>
        <textarea
          value={todo.description}
          type="text"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
      </div>
      <input
        value={todo.due}
        type="date"
        onChange={(e) =>
          setTodo({
            ...todo,
            due: e.target.value,
          })
        }
      />
      <div>
        <label>
          <input
            value={todo.completed}
            type="checkbox"
            onChange={(e) =>
              setTodo({
                ...todo,
                completed: e.target.checked,
              })
            }
          />
          Completed
        </label>
      </div>
      <div>
        <button onClick={postTodo}> Post Todo </button>
        <button onClick={updateTodo}>Update Todo</button>
      </div>
      <ul className="list-group">
        {todos.map((todoItem) => (
          <li key={todoItem.id} className="list-group-item">
            <input checked={todo.completed} type="checkbox" readOnly />
            {todoItem.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
            <button
              onClick={() => deleteTodo(todoItem)}
              className="btn btn-danger float-end ms-2"
            >
              Delete
            </button>
            <button
              className="btn btn-warning"
              onClick={() => fetchTodoById(todoItem.id)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default WorkingWithArrays;
