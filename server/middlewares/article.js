import articleValidator from '../helpers/articleHelper';

const validateArticle = (req, res, next) => {
  const { error } = articleValidator(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      error: error.details[0].message,
    });
  }
  return next();
};

export default validateArticle;
