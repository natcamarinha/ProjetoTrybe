const connection = require('./connection');

const addTask = async (name, description, date) => {
    const connect = await connection();

    const { insertedId } = await connect
        .collection('tasks')
        .insertOne({ name, description, date });
    
    console.log('model', insertedId);
    return insertedId;
};

module.exports = {
    addTask,
};
