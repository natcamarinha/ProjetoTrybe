const connection = require('./connection');

const addTask = async (name, description, date) => {
    const connect = await connection();

    const { insertedId } = await connect
        .collection('tasks')
        .insertOne({ name, description, date });
    
    console.log('model', insertedId);
    return insertedId;
};

const findTasks = async () => {
    const connect = await connection();

    const tasks = await connect
        .collection('tasks')
        .find()
        .toArray();
    
    console.log('model', tasks);
    return tasks;
};

module.exports = {
    addTask,
    findTasks,
};
