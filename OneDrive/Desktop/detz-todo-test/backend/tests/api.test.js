// backend/tests/api.test.js
const request = require('supertest');
const app = require('../index');
const store = require('../todoStore');

beforeEach(() => {
  store.resetStore();
});

describe('Todo API', () => {
  test('GET /api/todos returns empty array initially', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  test('POST /api/todos creates a todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: 'Write tests' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.text).toBe('Write tests');

    const list = await request(app).get('/api/todos');
    expect(list.body).toHaveLength(1);
  });

  test('PATCH /api/todos/:id/toggle toggles todo completed', async () => {
    const created = (await request(app).post('/api/todos').send({ text: 'A' })).body;
    const res = await request(app).patch(`/api/todos/${created.id}/toggle`);
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  test('DELETE /api/todos/:id deletes todo', async () => {
    const created = (await request(app).post('/api/todos').send({ text: 'A' })).body;
    const res = await request(app).delete(`/api/todos/${created.id}`);
    expect(res.status).toBe(204);
    const list = await request(app).get('/api/todos');
    expect(list.body).toHaveLength(0);
  });
});
