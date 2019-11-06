import pool from '../models/db/db';

const Article = {
  async postArticle(req, res) {
    const { id } = req.user;
    const { title, article, category } = req.body;
    let { createdOn } = req.body;
    createdOn = new Date();
    const queryText = {
      text: 'SELECT * FROM articles WHERE title = $1',
      values: [title],
    };
    try {
      const { rows } = await pool.query(queryText);
      if (rows[0]) {
        return res.status(401).json({
          status: 'error',
          error: 'Article already exists',
        });
      }
      const insertArticle = {
        text: 'INSERT INTO Articles (title, article, category, createdBy, createdOn) VALUES($1, $2, $3, $4, $5) RETURNING *',
        values: [title, article, category, id, createdOn],
      };

      const { rows: rowsInsert } = await pool.query(insertArticle);
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleId: rowsInsert[0].id,
          createdOn: rowsInsert[0].createdon,
          title: rowsInsert.title,

        },
      });
    } catch (e) {
      console.log(e);
    }
    return res.status(500).json({ status: 'error', error: 'something is wrong in the code' });
  },
};

export default Article;
