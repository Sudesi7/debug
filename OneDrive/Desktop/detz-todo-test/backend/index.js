// backend/index.js
const express = require('express');
const cors = require('cors');
const store = require('./todoStore');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/todos', (req, res) => {
  res.json(store.getTodos());
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'text is required' });
  }
  const todo = store.addTodo(text);
  res.status(201).json(todo);
});

app.patch('/api/todos/:id/toggle', (req, res) => {
  const id = Number(req.params.id);
  const todo = store.toggleTodo(id);
  if (!todo) return res.status(404).json({ error: 'not found' });
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const ok = store.deleteTodo(id);
  if (!ok) return res.status(404).json({ error: 'not found' });
  res.status(204).end();
});

// start server when run directly
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
}

module.exports = app;
