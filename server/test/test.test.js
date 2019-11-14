// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../app');
// const pool = require('../models/db/db');

// const { expect } = chai;
// chai.use(chaiHttp);

// let admintoken;
// let token;
// let token2;

// describe('User Authentication', () => {
//   before((done) => {
//     const deleteAdmin = 'DELETE FROM users;';
//     const insertAdmin = `INSERT INTO Users (
//         id, firstName, LastName, email, password, jobRole, department, address, isAdmin, isLoggedIn) VALUES
//         ('1', 'Olumide', 'Omitiran', 'admin@gmail.com', '$2b$10$M7KDGr9g3tKfFWC0RpuXI.mZPlEkZarOSQTmhKIxh4GXVRb2OscrO', 'admin', 'IT', '23, Diagon Alley', 'true', 'false')`;

//     pool.query(deleteAdmin, () => {
//       pool.query(insertAdmin, () => {
//         done();
//       }).catch(() => console.log('Could not delete admin'));
//     }).catch(() => console.log('Could not create admin'));
//   });

//   it('Lets admin login', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send({
//         email: 'admin@gmail.com',
//         password: 'password@123',
//       })
//       .end((err, res) => {
//         expect(res.status).to.be.equal(200);
//         expect(res.body.status).to.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('user_id');
//         expect(res.body.data).to.have.property('token');
//         expect(res.body).to.be.an('object');
//         admintoken = res.body.data.token;
//         done();
//       });
//   });

//   it('Lets admin register new users', (done) => {
//     chai
//       .request(app)
//       .post('api/v1/auth/signup')
//       .set('token', admintoken)
//       .send({
//         firstName: 'Test',
//         lastName: 'User',
//         email: 'testuser@gmail.com',
//         password: 'password@123',
//         jobRole: 'Accountant',
//         department: 'Accounting',
//         address: 'SW6 Stamford Bridge',
//       })
//       .end((err, res) => {
//         expect(res.status).to.be.equal(201);
//         expect(res.body.status).to.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('userId');
//         expect(res.body.data).to.have.property('token');
//         expect(res.body).to.be.an('object');
//         done();
//       });
//   });

//   it('Should flag Incorrect Password', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send({
//         email: 'testuser@gmail.com',
//         password: 'secret',
//       })
//       .end((err, res) => {
//         expect(res.status).to.be.equal(401);
//         expect(res.body.status).to.equal('error');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body).to.be.an('object');
//         done();
//       });
//   });

//   it('Lets users log in', (done) => {
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
//         expect(res.body.data).to.have.property('message');
//         expect(res.body.data).to.have.property('token');
//         expect(res.body).to.be.an('object');
//         token = res.body.data.token;
//         done();
//       });
//   });

//   it('checks user token before posting article', (done) => {
//     chai
//       .request(app)
//       .post('api/v1/articles')
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

//   it('Lets user post article', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/articles')
//       .set('token', token)
//       .send({
//         title: 'This is a new article',
//         article: 'This is a test article',
//         category: 'Test',
//       })
//       .end((err, res) => {
//         expect(res.body.status).to.have.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('message');
//         expect(res.body.data).to.have.property('articleId');
//         expect(res.body.data).to.have.property('title');
//         expect(res.body.data).to.have.property('createdOn');
//         done();
//       });
//   });

//   it('checks user token before editing article', (done) => {
//     chai
//       .request(app)
//       .patch('api/v1/articles/articleId')
//       .send({
//         title: 'This is a patched title',
//         article: 'This is a patched article',
//         category: 'Patched',
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

//   it('Lets user edit an article', (done) => {
//     chai
//       .request(app)
//       .patch('/api/v1/article/:articleId')
//       .set('token', token)
//       .send({
//         title: 'This is a patched title',
//         article: 'This is a patched article',
//         category: 'Patched',
//       })
//       .end((err, res) => {
//         expect(res.body.status).to.have.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('title');
//         expect(res.body.data).to.have.property('article');
//         done();
//       });
//   });

//   it('checks user token before posting comment on article', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/article/:articleId/comment')
//       .send({
//         comment: 'This is an article comment',
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

//   it('Lets user post comments on an article', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/article/articleId/comment')
//       .set('token', token)
//       .send({
//         comment: 'This is an article comment',
//       })
//       .end((err, res) => {
//         expect(res.body).to.have.property('status');
//         expect(res.body.status).to.have.equal('success');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('message');
//         expect(res.body.data).to.have.property('createdOn');
//         expect(res.body.data).to.have.property('articleTitle');
//         expect(res.body.data).to.have.property('article');
//         expect(res.body.data).to.have.property('comment');
//         expect(res.body).to.be.an('object');
//         done();
//       });
//   });

//   it('checks user token before commenting on a gif', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/gifs/gifId')
//       .send({
//         comment: 'This is an article comment',
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

//   it('Lets user post comments on an article', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/gifs/gifId/comment')
//       .set('token', token)
//       .send({
//         comment: 'This is a gif comment',
//       })
//       .end((err, res) => {
//         expect(res.body).to.have.property('status');
//         expect(res.body.status).to.have.equal('success');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('message');
//         expect(res.body.data).to.have.property('createdOn');
//         expect(res.body.data).to.have.property('gifTitle');
//         expect(res.body.data).to.have.property('comment');
//         expect(res.body.data.comment).to.be.an('array');
//         expect(res.body).to.be.an('object');
//         done();
//       });
//   });


//   it('Lets user delete an article', (done) => {
//     chai
//       .request(app)
//       .delete('/api/v1/article/:articleId')
//       .set('token', token)
//       .send({
//         title: 'This is a patched title',
//         article: 'This is a patched article',
//         category: 'Patched',
//       })
//       .end((err, res) => {
//         expect(res.body.status).to.have.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('title');
//         expect(res.body.data).to.have.property('article');
//         done();
//       });
//   });
// });



// describe('Articles', () => {
//   before((done) => {
//     const deleteArticles = 'DELETE FROM Articles;';
//     const deleteArticleComments = 'DELETE FROM ArticleComments';

//     pool.query(deleteArticles, () => {
//       pool.query(deleteArticleComments, () => {
//         done();
//       }).catch(() => console.log('Could not delete comments'));
//     }).catch(() => console.log('Could not delete articlecomments'));
//   });

//   it('checks user token before posting article', (done) => {
//     chai
//       .request(app)
//       .post('api/v1/articles')
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
//         expect(res.body.data).to.have.property('title');
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
//         expect(res.body.data).to.have.property('title');
//         expect(res.body.data).to.have.property('createdOn');
//         done();
//       });
//   });

//   it('checks user token before editing article', (done) => {
//     chai
//       .request(app)
//       .patch('api/v1/articles/1')
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
//       .post('/api/v1/article/1')
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
//       });
//   });

//   it('Lets new user edit posted article', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/articles/1')
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
//         expect(res.body.data).to.have.property('articleId');
//         expect(res.body.data).to.have.property('title');
//         expect(res.body.data).to.have.property('createdOn');
//         done();
//       });
//   });

//   it('Lets existing user edit post article', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/articles/2')
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
//         expect(res.body.data).to.have.property('articleId');
//         expect(res.body.data).to.have.property('title');
//         expect(res.body.data).to.have.property('createdOn');
//         done();
//       });
//   });

//   it('checks token before commenting on an article', (done) => {
//     chai
//       .request(app)
//       .post('/api/vi/articles/1/comment')
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
//       .post('/api/vi/articles/0/comment')
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
//         expect(res.body.data).to.have.property('articleTitle');
//         expect(res.body.data).to.have.property('article');
//         expect(res.body.data).to.have.property('comment');
//         done();
//       });
//   });

//   it('Lets a user get any article by ID', (done) => {
//     chai
//       .request(app)
//       .get('/api/v1/article/1')
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

// describe('Gifs', () => {
//   before((done) => {
//     const deleteGifComment = 'DELETE FROM GifComments';
//     pool.query(deleteGifComment, () => {
//       done();
//     }).catch((e) => console.log(`Cant delete the comments ${e.message}`));
//   });

//   it('Checks gif id before posting comment', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/gif/0/comment')
//       .set('token', token)
//       .send({
//         comment: 'This is a gif comment',
//       })
//       .end((err ,res) => {
//         expect(res.body).to.have.property('status');
//         expect(res.body.status).to.be.a('string');
//         done();
//       })
//   })

//   it('Lets user comment on gifs', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/gif/1/comment')
//       .set('token', token)
//       .send({
//         comment: 'This is a gif comment',
//       })
//       .end((err, res) => {
//         expect.expect(res.body.status).to.have.equal('success');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('data');
//         expect(res.body.data).to.have.property('message');
//         expect(res.body.data).to.have.property('createdOn');
//         expect(res.body.data).to.have.property('gifTitle');
//         expect(res.body.data).to.have.property('comment');

//       });
//   });

//   it('Lets user view gif by ID', () => {
//     chai
//     .request(app)
//     .get('api/v1/gif/3')
//     .set('token', token)
//     .send({

//     })
//     .end((err, res ) => {
//       expect(res.body).to.have.property('status');
//       expect(res.body).to.have.property('data');
//       expect(res.body.data).to.be.an('object');
//       expect(res.body.data).to.have.property('createdOn');
//       expect(res.body.data).to.have.property('title');
//       expect(res.body.data).to.have.property('imageurl');
//       expect(res.body.data).to.have.property('comments');
//     })
//   })
// });