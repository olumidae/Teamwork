import gifValidator from '../helpers/gifHelper';

const validateGif = (req, res, next) => {
  const { error } = gifValidator(req.body);
  if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
  return next();
};

export default validateGif;
