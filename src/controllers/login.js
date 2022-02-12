const { loginService } = require('../services/login');
// const { createToken } = require('../services/authService');

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email, password);

    //const token = await createToken(user);

    console.log('controller', user);
    return res.status(200).json({ user });
  } catch (error) {
    console.log('erro:', error);
    next(error);
  }
};

module.exports = {
  loginController,
};