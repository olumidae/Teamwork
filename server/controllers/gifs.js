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

    const findImage = {
      text: 'SELECT * FROM Gifs where title = $1',
      values: [title],
    };
    const { rows } = await pool.query(findImage);

    if (rows[0]) {
      return res.status(400).json({
        status: 'error',
        error: 'Gif already exists with same title',
      });
    }

    if (req.file) {
      const file = dataUri(req).content;

      uploader.upload(file).then(async (result) => {
        const image = result.url;
        const imageCloudId = result.public_id;
        const insertGif = {
          text: 'INSERT INTO Gifs (title, imageURL, imageCloudId, createdBy, createdOn) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          values: [title, image, imageCloudId, id, createdOn],
        };

        try {
          const { rows: rowsInsert } = await pool.query(insertGif);
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
          return res.status(500).json({
            status: 'error',
            error: `Internal server error ${e.message}`,
          });
        }
      });
    }
    return res.status(500).json({
      status: 'error',
      error: 'Internal server error',
    });
  },

  async sendGif(req, res) {
    if (req.file) {
      const file = dataUri(req).content;

      return uploader.upload(file).then((result) => {
        const image = result.url;
        return res.status(200).json({
          messge: 'Your image has been uploded successfully to cloudinary',
          data: {
            image,
          },
        });
      }).catch((err) => res.status(400).json({
        messge: 'someting went wrong while processing your request',
        data: {
          err,
        },
      }));
    }
  },
};

export default Gif;
