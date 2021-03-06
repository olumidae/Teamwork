// import cloud from '../config/cloudinaryConfig';
import pool from '../models/db/db';
import { uploader } from '../config/cloudinaryConfig';
import { dataUri } from '../middlewares/multer';

const Gif = {
  async postGifs(req, res) {
    const { id } = req.user;
    const { title } = req.body;
    let { createdOn } = req.body;
    createdOn = new Date();
    const findImage = 'SELECT * FROM Gifs where title = $1';
    const { rows } = await pool.query(findImage, [title]);
    if (rows[0]) {
      return res.status(400).json({ status: 'error', error: 'Gif already exists with same title' });
    }
    if (req.file) {
      const file = dataUri(req).content;
      uploader.upload(file).then(async (result) => {
        const image = result.url;
        const imageCloudId = result.public_id;
        const insertGif = 'INSERT INTO Gifs (title, imageURL, imageCloudId, createdBy, createdOn) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        try {
          const { rows: rowsInsert } = await pool.query(insertGif, [title, image, imageCloudId, id, createdOn]);
          return res.status(200).json({
            status: 'success',
            data: {
              id: rowsInsert[0].id,
              message: 'Gif image successfully posted',
              ceatedOn: rowsInsert[0].createdon,
              title: rowsInsert[0].title,
              imageURL: rowsInsert[0].imageurl,
              createdBy: rowsInsert[0].createdby,
            },
          });
        } catch (e) {
          return res.status(500).json({ status: 'error', error: `Internal server error ${e.message}` });
        }
      });
    }
    return res.status(500).json({
      status: 'error',
      error: 'Internal server error',
    });
  },

  async deleteGif(req, res) {
    const { gifId } = req.params;
    const { id } = req.user;
    const selectGif = 'SELECT * FROM Gifs WHERE createdBy = $1 AND id= $2';
    try {
      const { rows } = await pool.query(selectGif, [id, gifId]);
      if (!rows[0]) {
        return res.status(404).json({ status: 'error', error: 'No gif found' });
      }

      const deleteGif = 'DELETE FROM Gifs WHERE id= $1 and createdBy = $2';
      await pool.query(deleteGif, [gifId, id]);
      return res.status(200).json({
        status: 'error',
        data: {
          message: 'Gif post successfully deleted',
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: `Server Error: ${error.message}`,
      });
    }
  },

  async getGifById(req, res) {
    const { gifId } = req.params;
    const findGif = 'SELECT * FROM Gifs where id = $1';
    const findComments = 'SELECT * FROM GifComments WHERE gifId = $1';
    try {
      const { rows } = await pool.query(findGif, [gifId]);
      if (!rows[0]) {
        return res.status(404).json({ status: 'error', error: 'Gif not found' });
      }
      const { rows: comments } = await pool.query(findComments, [gifId]);

      return res.status(200).json({
        status: 'success',
        data: {
          id: rows[0].id,
          createdon: rows[0].createdon,
          title: rows[0].title,
          imageurl: rows[0].imageurl,
          comments,
        },
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: `Server Error: ${error.message}` });
    }
  },
};

export default Gif;
