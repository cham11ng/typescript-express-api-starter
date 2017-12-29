import { expect } from 'chai';
import * as request from 'supertest';
import * as HTTPStatus from 'http-status-codes';

import app from '../../src';

const name = 'John Doe';
const email = 'john.doe@example.com';

describe('User API is working', () => {
  it('should create new user', done => {
    const user = { name, email };
    request(app)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.CREATED);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.all.keys('id', 'name', 'email', 'updated_at', 'created_at');
        expect(res.body.data.name).to.equal(name);
        expect(res.body.data.email).to.equal(email);
        done();
      });
  });

  it('should return users list', done => {
    request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.OK);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.all.keys('id', 'name', 'email', 'updated_at', 'created_at');
        done();
      });
  });
});
