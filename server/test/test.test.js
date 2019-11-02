import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import pool from '../models/db/db';

const { expect } = chai;
chai.use(chaiHttp);

let admintoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzI2NDk4MjcsImV4cCI6MTU3NjMzNjIyN30.NFnCILcyafULX4MT0i8EIFJHP1DLgYZ6V328AEB-bAA';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTU3MjY4NzA3NSwiZXhwIjoxNTc2MzczNDc1fQ.KguDKWBGYQ09tGzTfKupjtA4sB7nQbgihsW0iUeMUac';

describe('User Authentication', () => {
  before((done) => {
    const deleteAdmin = 'DELETE FROM users;';
    const insertAdmin = `INSERT INTO Users (
        id, firstName, LastName, email, password, jobRole, department, address, isAdmin, isLoggedIn) VALUES
        ('1', 'Olumide', 'Omitiran', 'admin@gmail.com', '$2b$10$M7KDGr9g3tKfFWC0RpuXI.mZPlEkZarOSQTmhKIxh4GXVRb2OscrO', 'admin', 'IT', '23, Diagon Alley', 'true', 'false')`;

    pool.query(deleteAdmin, () => {
      pool.query(insertAdmin, () => {
        done();
      }).catch(() => console.log('Could not delete admin'));
    }).catch(() => console.log('Could not create admin'));
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
        expect(res.body.data).to.have.property('user_id');
        expect(res.body.data).to.have.property('token');
        expect(res.body).to.be.an('object');
        admintoken = res.body.data.token;
        done();
      });
  });

  it('Lets admin register new users', (done) => {
    chai
      .request(app)
      .post('api/v1/auth/signup')
      .set('token', admintoken)
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@gmail.com',
        password: 'password@123',
        jobRole: 'Accountant',
        department: 'Accounting',
        address: 'SW6 Stamford Bridge',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('userId');
        expect(res.body.data).to.have.property('token');
        expect(res.body).to.be.an('object');
        done();
      });
  });

});
