const Joi = require('joi');
const {
  loginModel,
} = require('../models/login');
const errorHandler = require('../utils/errorHandler');
const { createToken } = require('./authService');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginService = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) throw errorHandler(401, error.message);

  const user = await loginModel(email, password);

  if (!user) throw errorHandler(401, 'Incorrect username or password');

  const { password: _password, ...userWithoutPassword } = user;

  console.log('service', userWithoutPassword);

  const token = await createToken(userWithoutPassword);

  console.log('serviceToken', token);
  return token;
};

module.exports = {
  loginService,
};
