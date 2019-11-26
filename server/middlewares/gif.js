import gifValidator from '../helpers/gifHelper';
import pool from '../models/db/db';

const validateGif = (req, res, next) => {
  const { error } = gifValidator(req.body);
  if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
  return next();
};

export async function checkGifId(req, res, next) {
  const { gifId } = req.params;
  const findParam = 'SELECT * FROM Gifs WHERE id= $1';
  try {
    const { rows } = await pool.query(findParam, [gifId]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 'error',
        error: 'Gif does not exist',
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

// export async function checkUserGifId(req, res, next) {
//   const { id } = req.user;
//   const { gifId } = req.params;
//   const selectArticle = {
//     text: 'SELECT * FROM Articles WHERE createdBy = $1 AND id= $2',
//     values: [id, gifId],
//   };
//   try {
//     const { rows } = await pool.query(selectArticle);
//     if (!rows[0]) {
//       return res.status(404).json({
//         status: 'error',
//         error: 'Cannot delete gif created by another user',
//       });
//     }
//     return next();
//   } catch (error) {
//     return res.status(500).json({
//       status: 'error',
//       error: `Server Error ${error.message}`,
//     });
//   }
// }

export default validateGif;
