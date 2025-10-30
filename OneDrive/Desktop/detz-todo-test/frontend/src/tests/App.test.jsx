import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';

const mockTodos = [{ id: 1, text: 'Test todo', completed: false }];

beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (url.endsWith('/api/todos') && (!options || options.method === 'GET')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockTodos) });
    }
    if (url.endsWith('/api/todos') && options && options.method === 'POST') {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 2, text: 'New', completed: false }) });
    }
    if (url.includes('/toggle')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1, text: 'Test todo', completed: true }) });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('loads and shows todos and can add one', async () => {
  render(<App />);
  expect(screen.getByText(/Detz Todo Test/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('Test todo')).toBeInTheDocument());

  // add a new todo
  fireEvent.change(screen.getByLabelText('new-todo'), { target: { value: 'New' } });
  fireEvent.click(screen.getByText('Add'));
  await waitFor(() => expect(screen.getByText('New')).toBeInTheDocument());
});

test('toggle todo checkbox calls API', async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByText('Test todo')).toBeInTheDocument());
  const checkbox = screen.getByLabelText('toggle-1');
  fireEvent.click(checkbox);
  await waitFor(() => expect(checkbox.checked).toBe(true));
});
