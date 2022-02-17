const { ObjectId } = require('mongodb');
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

const editTaskModel = async ({ id, name, description, date }) =>{
    const connect = await connection();

    const editTask = await connect
        .collection('tasks')
        .findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: { name, description }},
            { returnOriginal: false },
        );
    
    console.log('model', editTask);
    return editTask.value;
};

const deleteTask = async (id) => {
    const connect = await connection();

    const removeTask = await connect
        .collection('tasks')
        .findOneAndDelete({ _id: ObjectId(id) });
    
    console.log('model', removeTask);
    return removeTask;
};

module.exports = {
    addTask,
    findTasks,
    editTaskModel,
    deleteTask,
};
