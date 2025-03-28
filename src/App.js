import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState(''); // Input ke liye state
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [editId, setEditId] = useState(null); // Editing ke liye task ka ID track karne ke liye
  const [editText, setEditText] = useState(''); // Edit input ka text

  // localStorage me todos save karne ke liye
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Task Add Karna
  const addTask = () => {
    if (task.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]); // Unique ID ke liye Date.now()
    setTask('');
  };

  // Task Delete Karna
  const deleteTask = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // Task Toggle Karna
  const toggleTask = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // Task Edit Karna
  const editTask = (id, text) => {
    setEditId(id); // Editing mode on karo aur ID set karo
    setEditText(text); // Edit input me task ka text daal do
  };

  // Save Edited Task
  const saveEdit = () => {
    if (editText.trim() === '') return;
    const newTodos = todos.map((todo) =>
      todo.id === editId ? { ...todo, text: editText } : todo
    );
    setTodos(newTodos);
    setEditId(null); // Editing mode off
    setEditText(''); // Input clear
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        {editId === null ? (
          <>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a new task"
            />
            <button onClick={addTask}>Add Task</button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
              placeholder="Edit your task"
            />
            <button onClick={saveEdit}>Save</button>
          </>
        )}
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? 'completed' : ''}
          >
            {todo.text}
            <div className="button-group">
              <button onClick={() => toggleTask(todo.id)}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => editTask(todo.id, todo.text)}>Edit</button>
              <button onClick={() => deleteTask(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;