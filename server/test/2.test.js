// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../app';
// import pool from '../models/db/db';

// const { expect } = chai;
// chai.use(chaiHttp);

// let token;
// let token2;


// describe('Articles', () => {
//   before((done) => {
//   const deleteArticles = 'DROP TABLE Articles, ArticleComments;';
//   const deleteArticleComments = `    CREATE TABLE Articles (
//     id SERIAL PRIMARY KEY NOT NULL,
//     title VARCHAR(128) NOT NULL,
//     article VARCHAR NOT NULL,
//     category VARCHAR(50) NOT NULL,
//     createdBy SERIAL NOT NULL REFERENCES Users (id),
//     createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
// CREATE TABLE ArticleComments (
//   id SERIAL PRIMARY KEY NOT NULL,
//   articleId SERIAL NOT NULL REFERENCES Articles (id),
//   articleComment VARCHAR(400) NOT NULL,
//   createdBy SERIAL NOT NULL REFERENCES Users (id),
//   createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );`;

//   pool.query(deleteArticles, () => {
//     pool.query(deleteArticleComments, () => {
//       done();
//     }).catch(() => {
//       console.log('');
//     });
//   }).catch(() => {
//     console.log('');
//   });
// });

//   it('Lets new users log in', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send({
//         email: 'johnsmith@gmail.com',
//         password: 'password@123',
//       })
//       .end((err, res) => {
//         expect(res.status).to.be.equal(200);
//         expect(res.body.status).to.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('userId');
//         expect(res.body.data).to.have.property('token');
//         expect(res.body).to.be.an('object');
//         token = res.body.data.token;
//         done();
//       });
//   });

//   it('Lets existing user log in', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send({
//         email: 'testuser@gmail.com',
//         password: 'password@123',
//       })
//       .end((err, res) => {
//         expect(res.status).to.be.equal(200);
//         expect(res.body.status).to.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('userId');
//         expect(res.body.data).to.have.property('token');
//         expect(res.body).to.be.an('object');
//         token2 = res.body.data.token;
//         done();
//       });
//   });

//   it('checks user token before posting article', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/articles')
//       .send({
//         title: 'This is a new article',
//         aticle: 'This is a test article',
//         category: 'Test',
//       })
//       .end((err, res) => {
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body.status).to.have.equal('error');
//         expect(res.body.status).to.be.a('string');
//         expect(res.body.error).to.be.a('string');
//         done();
//       });
//   });

//   it('Lets new user post article', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/articles')
//       .set('token', token)
//       .send({
//         title: 'This is a new users article',
//         article: 'This is a new users test article',
//         category: 'New Test',
//       })
//       .end((err, res) => {
//         expect(res.body.status).to.have.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('message');
//         expect(res.body.data).to.have.property('articleId');
//         expect(res.body.data).to.have.property('createdOn');
//         done();
//       });
//   });

//   it('Lets existing user post article', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/articles')
//       .set('token', token2)
//       .send({
//         title: 'This is an existing users new article',
//         article: 'This is an existing users test article',
//         category: 'Test',
//       })
//       .end((err, res) => {
//         expect(res.body.status).to.have.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('message');
//         expect(res.body.data).to.have.property('articleId');
//         expect(res.body.data).to.have.property('createdOn');
//         done();
//       });
//   });

//   it('checks user token before editing article', (done) => {
//     chai
//       .request(app)
//       .patch('/api/v1/articles/1')
//       .send({
//         title: 'This is a new users edited article',
//         aticle: 'This is a new users edited test article',
//         category: 'Edited Test',
//       })
//       .end((err, res) => {
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body.status).to.have.equal('error');
//         expect(res.body.status).to.be.a('string');
//         expect(res.body.error).to.be.a('string');
//         done();
//       });
//   });

//   it('checks articleId if it exist before editing', (done) => {
//     chai
//       .request(app)
//       .patch('/api/v1/articles/0')
//       .set('token', token)
//       .send({
//         title: 'This is a title',
//         article: 'This is an article',
//         category: 'Category',
//       })
//       .end((err, res) => {
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body.status).to.have.equal('error');
//         expect(res.body.status).to.be.a('string');
//         expect(res.body.error).to.be.a('string');
//         done();
//       });
//   });

//   it('wont edit an article not posted by user', (done) => {
//     chai
//       .request(app)
//       .patch('/api/v1/articles/1')
//       .set('token', token2)
//       .send({
//         title: 'John Smiths article',
//         article: 'This is trying to edit this article',
//         category: 'Tech',
//       })
//       .end((err, res) => {
//         expect(res.body).to.have.property('status');
//         expect(res.body.status).to.be.a('string');
//         expect(res.body).to.have.property('error');
//         expect(res.body.error).to.be.a('string');
//         done();
//       });
//   });

//   it('Lets new user edit posted article', (done) => {
//     chai
//       .request(app)
//       .patch('/api/v1/articles/1')
//       .set('token', token)
//       .send({
//         title: 'This is a new users edited test title',
//         article: 'This is a new users edited test article',
//         category: 'Edit Test',
//       })
//       .end((err, res) => {
//         expect(res.body.status).to.have.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('message');
//         expect(res.body.data).to.have.property('title');
//         done();
//       });
//   });

//   it('Lets existing user edit post article', (done) => {
//     chai
//       .request(app)
//       .patch('/api/v1/articles/2')
//       .set('token', token2)
//       .send({
//         title: 'This is an existing users edited title',
//         article: 'This is an existing users edited article',
//         category: 'Edit Test',
//       })
//       .end((err, res) => {
//         expect(res.body.status).to.have.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('message');
//         expect(res.body.data).to.have.property('title');
//         done();
//       });
//   });

//   it('checks token before commenting on an article', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/articles/1/comment')
//       .send({
//         comment: 'this is a comment',
//       })
//       .end((err, res) => {
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body.status).to.have.equal('error');
//         expect(res.body.status).to.be.a('string');
//         expect(res.body.error).to.be.a('string');
//         done();
//       });
//   });

//   it('checks article ID before commenting on article', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/articles/0/comment')
//       .set('token', token)
//       .send({
//         comment: 'this is a comment',
//       })
//       .end((err, res) => {
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body.status).to.have.equal('error');
//         expect(res.body.status).to.be.a('string');
//         expect(res.body.error).to.be.a('string');
//         done();
//       });
//   });

//   it('Lets user comment on a post', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/articles/1/comment')
//       .set('token', token2)
//       .send({
//         comment: 'This is a comment on the post',
//       })
//       .end((err, res) => {
//         expect(res.body.status).to.have.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('message');
//         expect(res.body.data).to.have.property('createdOn');
//         expect(res.body.data).to.have.property('comment');
//         done();
//       });
//   });

//   it('Lets a user get any article by ID', (done) => {
//     chai
//       .request(app)
//       .get('/api/v1/articles/1')
//       .set('token', token2)
//       .send({
//       })
//       .end((err, res) => {
//         expect(res.body).to.have.a.property('status');
//         expect(res.body).to.have.a.property('data');
//         expect(res.body.data).to.have.a.property('id');
//         expect(res.body.data).to.have.a.property('article');
//         expect(res.body.data).to.have.a.property('title');
//         done();
//       });
//   });
// });
