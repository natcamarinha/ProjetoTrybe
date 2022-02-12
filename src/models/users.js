const connection = require('./connection');

const addUser = async (name, email, password) => {
    const connect = await connection();

    const { insertedId } = await connect
        .collection('users')
        .insertOne({ name, email, password });

    console.log('model', insertedId);
    return insertedId;
};

const findUsers = async () => {
    const connect = await connection();

    const users = await connect
        .collection('users')
        .find()
        .toArray();

    console.log('model', users);
    return users;
};

const findUserByEmail = async (email) => {
    const connect = await connection();

    const userEmail = await connect
        .collection('users')
        .findOne({ email });
    
    console.log('model', userEmail);
    return userEmail;
};

module.exports = {
    addUser,
    findUsers,
    findUserByEmail,
};
