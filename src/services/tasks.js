const Joi = require('joi');
const {
    addTask,
    findTasks,
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

module.exports = {
    addTaskService,
    findTasksService,
};
