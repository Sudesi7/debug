import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import './App.css';

// ✅ Safe way to handle import.meta.env even when running in Jest
const API =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  process.env.VITE_API_URL ||
  'http://localhost:4000';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // ✅ Fetch existing todos
  useEffect(() => {
    fetch(`${API}/api/todos`)
      .then((r) => r.json())
      .then(setTodos)
      .catch((err) => console.error('Failed to load todos:', err));
  }, []);

  // ✅ Add new todo
  const add = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await fetch(`${API}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const todo = await res.json();
      setTodos((t) => [...t, todo]);
      setText('');
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  // ✅ Toggle todo completed state
  const toggle = async (id) => {
    try {
      const res = await fetch(`${API}/api/todos/${id}/toggle`, {
        method: 'PATCH',
      });
      const updated = await res.json();
      setTodos((t) => t.map((x) => (x.id === id ? updated : x)));
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  };

  return (
    <div className="container">
      <h1>Detz Todo Test</h1>
      <form onSubmit={add}>
        <input
          aria-label="new-todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <TodoList todos={todos} onToggle={toggle} />
    </div>
  );
}
