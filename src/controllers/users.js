const {
  addUserService,
  findUsersService,
} = require('../services/users');

const addUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await addUserService(name, email, password);

    console.log('controller', newUser);

    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.log('erro:', error);
    next(error);
  }
};

const findUsersController = async (req, res, next) => {
  try {
    const users = await findUsersService();

    console.log('controller', users);
    return res.status(200).json(users);
  } catch (error) {
    console.log('erro:', error);
    next(error);
  }
};

module.exports = {
  addUserController,
  findUsersController,
};
