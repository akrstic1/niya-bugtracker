const joi = require("joi");

const registerValidation = (data) => {
  const schema = joi.object({
    fullName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    roles: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const projectValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    users: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)),
  });

  return schema.validate(data);
};

const ticketValidation = (data) => {
  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    status: joi.string().required(),
    priority: joi.string().required(),
  });

  return schema.validate(data);
};

const commentValidation = (data) => {
  const schema = joi.object({
    message: joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  ticketValidation,
  projectValidation,
  commentValidation,
};
