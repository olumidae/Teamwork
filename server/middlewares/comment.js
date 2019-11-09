import commentValidator from '../helpers/commentHelper';

const validateComment = (req, res, next) => {
  const { error } = commentValidator(req.body);
  if (error) {
    res.status(400).json({
      status: 'error',
      error: error.details[0].message,
    });
  }
  return next();
};

export default validateComment;
