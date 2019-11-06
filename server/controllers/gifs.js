// import cloud from '../config/cloudinaryConfig';
import pool from '../models/db/db';


const Gif = {
  async postGifs(req, res) {
    const { title, createdOn } = req.body;

    const findImage = {
      text: 'SELECT from Gifs where title = $1',
      values: [title],
    };
    const { rows } = await pool.query(findImage);
    console.log(rows);
    if (rows[0].title === title) {
      res.status(400).json({
        status: 'error',
        error: 'Gif already exists with same title',
      });
    } else {
      let imageDetails = {
        title,
        imageURL: req.files[0].path,
        imageCloudId: '',
      };
      console.log('>>>>>>>');
      console.log(imageDetails.imageURL);
      cloud.uploads(imageDetails.imageURL).then(async (result) => {
        console.log(result);
        // let imageDetails = [
        //   {
        //     title: req.body.title,
        //     imageURL: result.url,
        //     imageCloudId: result.id,
        //     createdBy: req.user.id,
        //     createdOn: req.body.createdOn,
        //   },
        // ];
        const { imageURL } = result.url;
        const { imageCloudId } = result.id;
        const { createdBy } = req.user.id;
        const insertGif = {
          text: 'INSERT INTO Gifs (title, imageURL, imageCloudId createdBy, createdOn)',
          values: [title, imageURL, imageCloudId, createdBy, createdOn],
        };

        try {
          const { rows: rowsInsert } = await pool.query(insertGif);
          console.log(rowInsert);
          return res.status(200).json({
            stauts: 'success',
            data: {
              id: rowsInsert[0].id,
              message: 'Gif image successfully posted',
              ceatedOn: rowsInsert[0].createdOn,
              title: rowsInsert[0].title,
              imageURL: rowsInsert[0].imageURL,
              createdBy: req.user.id,
            },
          });
        } catch (e) {
          return res.status(500).json({
            status: 'error',
            error: 'Internal server error. Please hold on',
          });
        }
      });
    }
  },
};

export default Gif;
