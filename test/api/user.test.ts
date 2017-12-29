import app from '../../src';
import { expect } from 'chai';
import * as request from 'supertest';
import lang from '../../src/utils/lang';
import * as HTTPStatus from 'http-status-codes';

let userId;
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
        expect(res.body.data).to.have.all.keys(
          'id',
          'name',
          'email',
          'updated_at',
          'created_at'
        );
        expect(res.body.data.name).to.equal(name);
        expect(res.body.data.email).to.equal(email);
        done();
        userId = res.body.data.id;
      });
  });

  it('should fail when trying to create user with same email', done => {
    const user = { name, email };
    request(app)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.BAD_REQUEST);
        expect(res.body).to.have.property('error');
        expect(res.body.error.code).to.equal(HTTPStatus.BAD_REQUEST);
        expect(res.body.error.message).to.equal(lang.emailTaken);
        done();
      });
  });

  it('should return recently created user info', done => {
    request(app)
      .get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.OK);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.all.keys(
          'id',
          'name',
          'email',
          'updated_at',
          'created_at'
        );
        expect(res.body.data.name).to.equal(name);
        expect(res.body.data.email).to.equal(email);
        done();
      });
  });

  it('should fail when user not found', done => {
    const user = { name, email };
    request(app)
      .get(`/api/users/0`)
      .send(user)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.NOT_FOUND);
        expect(res.body).to.have.property('error');
        expect(res.body.error.code).to.equal(HTTPStatus.NOT_FOUND);
        expect(res.body.error.message).to.equal(lang.userNotFound);
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
        expect(res.body.data[0]).to.have.all.keys(
          'id',
          'name',
          'email',
          'updated_at',
          'created_at'
        );
        done();
      });
  });
});
