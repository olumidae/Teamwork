import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import pool from '../models/db/db';

const { expect } = chai;
chai.use(chaiHttp);

let token;
let token2;

describe('Gifs', () => {
//   before((done) => {
//     const deleteGifComment = 'DELETE FROM GifComments';
//     pool.query(deleteGifComment, () => {
//       done();
//     }).catch((e) => console.log(`Cant delete the comments ${e.message}`));
//   })

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

  it('Checks gif id before posting comment', (done) => {
    chai
      .request(app)
      .post('/api/v1/gifs/0/comment')
      .set('token', token)
      .send({
        comment: 'This is a gif comment',
      })
      .end((err,res) => {
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.have.equal('error');
        expect(res.body.status).to.be.a('string');
        expect(res.body.error).to.be.a('string');
        done();
      });
  });

  it('Lets user comment on gifs', (done) => {
    chai
      .request(app)
      .post('/api/v1/gifs/5/comment')
      .set('token', token)
      .send({
        comment: 'This is a gif comment',
      })
      .end((err, res) => {
        expect(res.body.status).to.have.equal('success');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data).to.have.property('createdOn');
        expect(res.body.data).to.have.property('gifTitle');
        expect(res.body.data).to.have.property('comment');
        done();
      });
  });

  it('Lets user view gif by ID', () => {
    chai
      .request(app)
      .get('api/v1/gifs/3')
      .set('token', token)
      .send({

      })
      .end((err, res ) => {
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('createdOn');
        expect(res.body.data).to.have.property('title');
        expect(res.body.data).to.have.property('imageurl');
        expect(res.body.data).to.have.property('comments');
      });
  });
});