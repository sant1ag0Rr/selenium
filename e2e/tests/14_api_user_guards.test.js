import request from 'supertest';
import { expect } from 'chai';

const BASE_API = 'http://localhost:5000';

describe('API E2E: User route guards (sin token)', function () {
  this.timeout(20000);

  it('DELETE /api/user/delete/:id -> 401/403', async () => {
    const res = await request(BASE_API)
      .delete('/api/user/delete/64b9f6b7e0f0000000000000');
    expect([401, 403]).to.include(res.status);
  });

  it('POST /api/user/razorpay -> 401/403', async () => {
    const res = await request(BASE_API)
      .post('/api/user/razorpay')
      .send({ amount: 1000, currency: 'INR' });
    expect([401, 403]).to.include(res.status);
  });
});
