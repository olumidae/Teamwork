import pool from '../models/db/db';

const Feed = {
  async getFeed(req, res) {
    const getArticles = {
      text: 'SELECT id, createdOn, title, article, createdBy FROM Articles ORDER BY createdOn DESC',
    };

    try {
      const { rows: data } = await pool.query(getArticles);
      if (!data) {
        return res.status(404).json({
          status: 'error',
          error: 'No article found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: `Server Error: ${error.message}`,
      });
    }
  },
};

export default Feed;
