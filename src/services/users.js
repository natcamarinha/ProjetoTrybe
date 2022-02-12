const Joi = require('joi');
const errorHandler = require('../utils/errorHandler');

const {
    addUser,
    findUsers,
    findUserByEmail,
} = require('../models/users');

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const addUserService = async (name, email, password) => {
    const { error } = userSchema.validate({ name, email, password });

    if (error) throw errorHandler(400, error.message);

    const userExits = await findUserByEmail(email);

    if (userExits) throw errorHandler(409, 'Email already registered');

    const newUser = await addUser(name, email, password);

    console.log('service: ', newUser);

    return {
        id: newUser,
        name,
        email,
    };
};

const findUsersService = async () => {
    const users = await findUsers();

    // const { password: _password, ...usersWithoutPassword } = users;

    console.log('service', users);
    return { users };
};

module.exports = {
    addUserService,
    findUsersService,
};
