import React, { useState, useEffect } from 'react';
import './App.css';

// use state: jab change ho to render kr le
//use effect: render hone k baad kya krna h vo ye btata (data fetch krna, local storage m data save krna)

function App() {
  const [task, setTask] = useState(''); // Input ke liye state
  const [todos, setTodos] = useState(() => {
    // localStorage se todos load karo, agar nahi hain toh empty array
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // localStorage me todos save karne ke liye useEffect
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // Har baar todos update hone pe chalega

  // Function 1: Task Add Karna
  const addTask = () => {
    if (task.trim() === '') return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask('');
  };

  // Function 2: Task Delete Karna
  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Function 3: Task Toggle Karna
  const toggleTask = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={todo.completed ? 'completed' : ''}
          >
            {todo.text}
            <div className="button-group">
              <button onClick={() => toggleTask(index)}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;