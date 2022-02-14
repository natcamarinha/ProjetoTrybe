const jwt = require('jsonwebtoken');
require('dotenv').config;

const { JWT_SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, JWT_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    // console.log(token);
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log('JWT', decoded);
    const { data } = decoded;
    console.log('JWT2', data);
    return data;
  } catch (error) {
    console.log('erroVerificação: ', error);
    return null;
  }
};

module.exports = {
  createToken,
  verifyToken,
};