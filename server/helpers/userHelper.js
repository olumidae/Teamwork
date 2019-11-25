import Joi from 'joi';

const signupValidator = (user) => {
  const pattern = /^[a-zA-Z0-9!@#$%&*]{3,25}$/;
  const signupFormat = {
    firstName: Joi.string().min(2).max(128).trim().required(),
    lastName: Joi.string().min(2).max(128).trim().required(),
    email: Joi.string().min(5).max(128).required().email(),
    password: Joi.string().regex(pattern).min(7).max(255).required(),
    jobRole: Joi.string().min(2).max(128).required(),
    department: Joi.string().min(2).max(128).required(),
    address: Joi.string().max(300).required(),
  };
  return Joi.validate(user, signupFormat);
};

const loginValidator = (user) => {
  const loginFormat = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  }).with('email', 'password');
  return Joi.validate(user, loginFormat);
};

export default {
  signupValidator, loginValidator,
};
