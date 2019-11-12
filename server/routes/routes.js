import express from 'express';
import User from '../controllers/users';
import Gif from '../controllers/gifs';
import Article from '../controllers/article';
import Comments from '../controllers/comment';
import { tokenValidator, signupValidator, loginValidator } from '../middlewares/auth';
import validateArticle, { checkArticleId, checkUserArticleId } from '../middlewares/article';
import validateComment from '../middlewares/comment';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { multerUploads } from '../middlewares/multer';
import { checkGifId } from '../middlewares/gif';
import Feed from '../controllers/feed';

const router = express.Router();

router.post('/auth/create-user', tokenValidator.validateAdminToken, signupValidator, User.signupUser);
router.post('/auth/signin', loginValidator, User.logInUser);
router.post('/gifs', tokenValidator.validateUserToken, cloudinaryConfig, multerUploads, Gif.postGifs);
router.post('/articles', tokenValidator.validateUserToken, validateArticle, Article.postArticle);
router.patch('/articles/:articleId', tokenValidator.validateUserToken, checkArticleId, checkUserArticleId, validateArticle, Article.editArticles);
router.delete('/articles/:articleId', tokenValidator.validateUserToken, Article.deleteArticle);
router.post('/articles/:articleId/comment', tokenValidator.validateUserToken, checkArticleId, validateComment, Comments.postArticleComments);
router.get('/articles/:articleId', tokenValidator.validateUserToken, Article.getArticleById);
router.delete('/gifs/:gifId', tokenValidator.validateUserToken, checkGifId, Gif.deleteGif);
router.post('/gifs/:gifId/comment', tokenValidator.validateUserToken, checkGifId, validateComment, Comments.postGifsComment);
router.get('/feed', tokenValidator.validateUserToken, Feed.getFeed);
router.get('/gifs/:gifId/', tokenValidator.validateUserToken, checkGifId, Gif.getGifById);

export default router;
