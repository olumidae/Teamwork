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

    try {
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
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        error: `Server error: ${error.message}`,
      });
    }
  },

  async postGifsComment(req, res) {
    const { gifId } = req.params;
    const { id } = req.user;
    const { comment } = req.body;
    let { createdOn } = req.body;
    createdOn = new Date();

    const selectGif = {
      text: 'SELECT * FROM Gifs WHERE id = $1',
      values: [gifId],
    };

    const postGifComment = {
      text: 'INSERT INTO GifComments(gifId, gifComment, createdBy, createdOn) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [gifId, comment, id, createdOn],
    };

    try {
      const { rows } = await pool.query(selectGif);

      if (!rows[0]) {
        return res.status(404).json({
          status: 'Error',
          error: 'Cannot find gif to comment on',
        });
      }
      const { rows: rowsInsert } = await pool.query(postGifComment);

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Comment succeessfully posted',
          createdOn: rowsInsert[0].createdon,
          gifTitle: rows[0].title,
          comment: rowsInsert[0].gifcomment,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: `Server error: ${error.message}`,
      });
    }
  },
};

export default Comments;
