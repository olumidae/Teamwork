import Joi from 'joi';

const commentValidator = (comment) => {
  const commentFormat = {
    // id: Joi.string(),
    // articleId: Joi.string(),
    comment: Joi.string().max(400).required(),
    createdBy: Joi.string(),
    createdOn: Joi.date().iso(),
  };
  return Joi.validate(comment, commentFormat);
};

export default commentValidator;
