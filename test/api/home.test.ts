import { expect } from 'chai';
import * as request from 'supertest';
import * as HTTPStatus from 'http-status-codes';

import app from '../../src';

describe('Test if api is working', () => {
  it('should return API information', done => {
    request(app)
      .get('/api')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.OK);
        done();
      });
  });
});
