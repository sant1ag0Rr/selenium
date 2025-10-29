import request from 'supertest';
import { expect } from 'chai';

const BASE_API = 'http://localhost:5000';

describe('API E2E: Public endpoints', function () {
  this.timeout(20000);

  it('GET /api/user/listAllVehicles -> 200 y arreglo', async () => {
    const res = await request(BASE_API)
      .get('/api/user/listAllVehicles');
    expect([200, 204]).to.include(res.status);
    if (res.status === 200) {
      expect(res.body).to.be.an('array');
    }
  });
});
