// backend/todoStore.js
let todos = [];
let idCounter = 1;

function resetStore() {
  todos = [];
  idCounter = 1;
}

function getTodos() {
  return todos;
}

function addTodo(text) {
  const todo = { id: idCounter++, text, completed: false };
  todos.push(todo);
  return todo;
}

function toggleTodo(id) {
  const t = todos.find(x => x.id === id);
  if (!t) return null;
  t.completed = !t.completed;
  return t;
}

function deleteTodo(id) {
  const idx = todos.findIndex(x => x.id === id);
  if (idx === -1) return false;
  todos.splice(idx, 1);
  return true;
}

module.exports = { getTodos, addTodo, toggleTodo, deleteTodo, resetStore };
