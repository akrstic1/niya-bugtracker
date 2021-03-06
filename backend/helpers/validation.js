const joi = require("joi");

const registerValidation = (data) => {
  const schema = joi.object({
    fullName: joi.string().required(),
    username: joi.string().min(6).max(20).required(),
    password: joi.string().min(6).required(),
    //roles: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(6).max(20).required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const updateUserValidation = (data) => {
  const schema = joi.object({
    fullName: joi.string(),
    username: joi.string().min(6).max(20),
    roles: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)),
  });

  return schema.validate(data);
};

const changePasswordValidation = (data) => {
  const schema = joi.object({
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const createProjectValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    users: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)),
  });

  return schema.validate(data);
};

const updateProjectValidation = (data) => {
  const schema = joi.object({
    name: joi.string(),
    description: joi.string(),
    users: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)),
  });

  return schema.validate(data);
};

const createTicketValidation = (data) => {
  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    status: joi.string().required(),
    priority: joi.string().required(),
  });

  return schema.validate(data);
};

const updateTicketValidation = (data) => {
  const schema = joi.object({
    title: joi.string(),
    description: joi.string(),
    status: joi.string(),
    priority: joi.string(),
  });

  return schema.validate(data);
};

const createCommentValidation = (data) => {
  const schema = joi.object({
    message: joi.string().required(),
  });

  return schema.validate(data);
};

const updateCommentValidation = (data) => {
  const schema = joi.object({
    message: joi.string(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  updateUserValidation,
  createTicketValidation,
  updateTicketValidation,
  updateProjectValidation,
  createProjectValidation,
  createCommentValidation,
  updateCommentValidation,
};
