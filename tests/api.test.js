import request from 'supertest';
import app from '../src/server.js';

describe('API', () => {
  test('GET /healthz', async () => {
    const res = await request(app).get('/healthz');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(typeof res.body.commit).toBe('string');
  });

  test('POST + GET /api/v1/todos (happy path)', async () => {
    const post = await request(app)
      .post('/api/v1/todos')
      .send({ title: 'first', done: false })
      .set('content-type', 'application/json');
    expect(post.status).toBe(201);
    expect(post.body.title).toBe('first');

    const list = await request(app).get('/api/v1/todos');
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);
    expect(list.body.length).toBeGreaterThanOrEqual(1);
  });

  test('POST /api/v1/todos validation (negative)', async () => {
    const res = await request(app)
      .post('/api/v1/todos')
      .send({ done: true })
      .set('content-type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/title/);
  });
});
