import request from 'supertest';
import { expect } from 'chai';

const BASE_API = 'http://localhost:5000';

describe('API E2E: Auth validation', function () {
  this.timeout(20000);

  it('POST /api/auth/signin sin body -> 400', async () => {
    const res = await request(BASE_API)
      .post('/api/auth/signin')
      .send({});
    expect(res.status).to.equal(400);
    const msg = (res.body && (res.body.message || res.body.error)) || '';
    expect(msg.toLowerCase()).to.match(/email|password|required/);
  });

  it('POST /api/auth/refreshToken sin Authorization -> 403', async () => {
    const res = await request(BASE_API)
      .post('/api/auth/refreshToken');
    expect(res.status).to.equal(403);
  });
});
