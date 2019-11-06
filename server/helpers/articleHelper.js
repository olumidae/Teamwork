import Joi from 'joi';

const articleValidator = (article) => {
  const articleFormat = {
    title: Joi.string().max(128).required(),
    article: Joi.string().required(),
    category: Joi.string().max(50).required(),
    createdBy: Joi.string(),
    createdOn: Joi.date().iso(),
  };
  return Joi.validate(article, articleFormat);
};

export default articleValidator;
