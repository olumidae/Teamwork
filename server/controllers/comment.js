import pool from '../models/db/db';


const Comments = {
  async postArticleComments(req, res) {
    const { articleId } = req.params;
    const { id } = req.user;
    const { comment } = req.body;
    let { createdOn } = req.body;
    createdOn = new Date();


    const findArticle = {
      text: 'SELECT FROM Articles WHERE id = $1',
      values: [articleId],
    };

    const { rows } = await pool.query(findArticle);

    if (!rows[0]) {
      return res.status(404).json({
        errror: 'error',
        status: 'Article not found',
      });
    }

    const postComment = {
      text: 'INSERT INTO ArticleComments(articleId, articleComment, createdBy, createdOn) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [articleId, comment, id, createdOn],
    };
    const { rows: rowsInsert } = await pool.query(postComment);

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Comment succeessfully posted',
        createdOn: rowsInsert[0].createdon,
        articleTitle: rowsInsert[0].title,
        article: rows[0].article,
        comment: rowsInsert[0].articlecomment,
      }
    });
  },
};

export default Comments;
