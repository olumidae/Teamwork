import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import pool from '../models/db/db';

const { expect } = chai;
chai.use(chaiHttp);

let admintoken;
let token;
let token2;

describe('User Authorization and Authentication', () => {
  before((done) => {
    const john = 'jsmith@gmail.com';
    const deleteJohn = 'DELETE FROM Users WHERE email = \'jsmith@gmail.com\';';

    pool.query(deleteJohn, () => {
      done();
    }).catch(() => console.log(''));
  });

  it('Lets admin login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'admin@gmail.com',
        password: 'password@123',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('userId');
        expect(res.body.data).to.have.property('token');
        expect(res.body).to.be.an('object');
        admintoken = res.body.data.token;
        done();
      });
  });

  it('Lets admin register new user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/create-user')
      .set('token', admintoken)
      .send({
        firstName: 'John',
        lastName: 'Smith',
        email: 'jsmith@gmail.com',
        password: 'password@123',
        jobRole: 'HR Manager',
        department: 'Human Resources',
        address: '23, Bourdillion Drive',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.status).to.equal('success');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('userId');
        expect(res.body.data).to.have.property('token');
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should flag Incorrect Password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'testuser@gmail.com',
        password: 'secret',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Lets new users log in', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'johnsmith@gmail.com',
        password: 'password@123',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('userId');
        expect(res.body.data).to.have.property('token');
        expect(res.body).to.be.an('object');
        token = res.body.data.token;
        done();
      });
  });

  it('Lets existing user log in', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'testuser@gmail.com',
        password: 'password@123',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('userId');
        expect(res.body.data).to.have.property('token');
        expect(res.body).to.be.an('object');
        token2 = res.body.data.token;
        done();
      });
  });
});
