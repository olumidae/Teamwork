import articleValidator from '../helpers/articleHelper';
import pool from '../models/db/db';
const validateArticle = (req, res, next) => {
  const { error } = articleValidator(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      error: error.details[0].message,
    });
  }
  return next();
};


export async function checkArticleId(req, res, next) {
  const { articleId } = req.params;
  const findParam = {
    text: 'SELECT * FROM Articles WHERE id= $1',
    values: [articleId],
  };
  try {
    const { rows } = await pool.query(findParam);
    if (!rows[0]) {
      return res.status(404).json({
        status: 'error',
        error: 'Article does not exist',
      });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: `Server Error ${error.message}`,
    });
  }
}

export async function checkUserArticleId(req, res, next) {
  const { id } = req.user;
  const { articleId } = req.params;
  const selectArticle = {
    text: 'SELECT * FROM Articles WHERE createdBy = $1 AND id= $2',
    values: [id, articleId],
  };
  try {
    const { rows } = await pool.query(selectArticle);
    if (!rows[0]) {
      return res.status(404).json({
        status: 'error',
        error: 'Cannot edit article created by another user',
      });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: `Server Error ${error.message}`,
    });
  }
}

export default validateArticle;
