import express from 'express';
import User from '../controllers/users';
// import Gif from '../controllers/gifs';
import Article from '../controllers/article';
// import upload from '../config/multerConfig';
import { tokenValidator, signupValidator, loginValidator } from '../middlewares/auth';
// import gifValidator from '../middlewares/gif';
import validateArticle from '../middlewares/article';

const router = express.Router();

router.post('/auth/create-user', tokenValidator.validateAdminToken, signupValidator, User.signupUser);
router.post('/auth/signin', loginValidator, User.logInUser);
// router.post('/gifs', tokenValidator.validateUserToken, gifValidator, upload.any(), Gif.postGifs);
router.post('/articles', tokenValidator.validateUserToken, validateArticle, Article.postArticle);
router.patch('/articles/:articleId', tokenValidator.validateUserToken, validateArticle, Article.editArticles);
router.delete('/articles/:articleId', tokenValidator.validateUserToken, Article.deleteArticle);

export default router;
