const { verifyToken } = require('../services/authService');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const data = verifyToken(authorization);

    console.log('auth', data);

    req.user = data;

    next();
  } catch (error) {
    console.log('erroValidação: ', error);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
