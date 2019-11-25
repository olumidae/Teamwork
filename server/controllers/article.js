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
      return res.status(500).json({ status: 'error', error: `Server error ${e.message}` });
    }
  },

  async editArticles(req, res) {
    const { articleId } = req.params;
    const { title, article } = req.body;
    const updateArticle = {
      text: 'UPDATE Articles SET title = $1, article = $2 WHERE id = $3',
      values: [title, article, articleId],
    };
    try {
      await pool.query(updateArticle);

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Article successfully updated',
          title,
          article,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: `Server Error: ${error.message}`,
      });
    }
  },

  async deleteArticle(req, res) {
    const { articleId } = req.params;
    const { id } = req.user;
    const selectArticle = {
      text: 'SELECT * FROM Articles WHERE createdBy = $1 AND id= $2',
      values: [id, articleId],
    };
    // 'DELETE FROM Articles WHERE id = $1 AND createdBy = $2',
    try {
      const { rows } = await pool.query(selectArticle);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'No article found',
        });
      }

      const deleteArticle = {
        text: 'DELETE FROM Articles WHERE id= $1',
        values: [articleId],
      };
      await pool.query(deleteArticle);
      return res.status(200).json({
        status: 'error',
        data: {
          message: 'Article successfully deleted',
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: `Server Error: ${error.message}`,
      });
    }
  },

  async getArticleById(req, res) {
    const { articleId } = req.params;
    const findArticle = 'SELECT * FROM Articles where id = $1';
    const findComments = 'SELECT * FROM ArticleComments WHERE articleId = $1';
    try {
      const { rows } = await pool.query(findArticle, [articleId]);
      if (!rows[0]) {
        return res.status(404).json({ status: 'error', error: 'Article not found' });
      }
      const { rows: comments } = await pool.query(findComments, [articleId]);
      return res.status(200).json({
        status: 'success',
        data: {
          id: rows[0].id,
          createdon: rows[0].createdon,
          title: rows[0].title,
          article: rows[0].article,
          comments,
        },
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: `Server Error: ${error.message}` });
    }
  },
};

export default Article;
