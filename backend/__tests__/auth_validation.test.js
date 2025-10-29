import request from 'supertest';
import App from '../app.js';

describe('Auth validation (no DB required)', () => {
  test('POST /api/auth/signin without body returns 400', async () => {
    const res = await request(App).post('/api/auth/signin').send({});
    expect(res.status).toBe(400);
    expect(res.body.message ?? res.body.error ?? '').toMatch(/email.*password|required/i);
  });

  test('POST /api/auth/refreshToken without Authorization header returns 403', async () => {
    const res = await request(App).post('/api/auth/refreshToken');
    expect(res.status).toBe(403);
  });
});
