import Joi from 'joi';

const gifValidator = (gif) => {
  const gifFormat = {
    title: Joi.string().max(128).required(),
    imageURL: Joi.string().required(),
    imageCloudId: Joi.string(),
    created: Joi.string(),
    createdOn: new Date(),
  };
  return Joi.validate(gif, gifFormat);
};

export default gifValidator;
