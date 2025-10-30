import React from 'react';

export default function TodoList({ todos = [], onToggle }) {
  if (!todos.length) return <p>No todos yet</p>;

  return (
    <ul>
      {todos.map(t => (
        <li key={t.id}>
          <label>
            <input
              aria-label={`toggle-${t.id}`}
              type="checkbox"
              checked={t.completed}
              onChange={() => onToggle(t.id)}
            />
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
              {t.text}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
