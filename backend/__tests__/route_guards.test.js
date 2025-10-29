import request from 'supertest';
import App from '../app.js';

describe('Route guards with verifyToken (no tokens)', () => {
  test('DELETE /api/user/delete/:id returns 403 without tokens', async () => {
    const res = await request(App).delete('/api/user/delete/64b9f6b7e0f0000000000000');
    expect([401,403]).toContain(res.status);
  });

  test('POST /api/user/razorpay returns 403 without tokens', async () => {
    const res = await request(App).post('/api/user/razorpay').send({ amount: 1000 });
    expect([401,403]).toContain(res.status);
  });
});
