const Joi = require('joi');
const { ObjectId } = require('mongodb');
const {
    addTask,
    findTasks,
    editTaskModel,
} = require('../models/tasks');
const errorHandler = require('../utils/errorHandler');

const taskSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
});

const addTaskService = async (name, description, date) => {

    const { error } = taskSchema.validate({ name, description });

    if (error) throw errorHandler(400, error.message);

    const task = await addTask(name, description, date);

    console.log('service', task);

    return {
        id: task,
        name,
        description,
        date,
    };
};

const findTasksService = async () => {
    const tasks = await findTasks();

    return tasks;
};

const editTaskService = async ({ id, name, description, date }) => {
    if (!ObjectId.isValid(id)) throw errorHandler(404, 'task not found');

    const editTask = await editTaskModel({ id, name, description, date });

    console.log('service', editTask);

    return editTask;
};

module.exports = {
    addTaskService,
    findTasksService,
    editTaskService,
};
