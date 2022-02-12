const {
    addTaskService,
    findTasksService,
    editTaskService,
} = require('../services/tasks');

const addTaskController = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const date = new Date();

        const newTask = await addTaskService(name, description, date);

        console.log('controller', newTask);
        return res.status(201).json({ tasks: newTask });
    } catch (error) {
        console.log('err: ', error);
        next(error);
    }
};

const findTasksController = async (req, res, next) => {
    try {
        const tasks = await findTasksService();

        return res.status(200).json(tasks);
    } catch (error) {
        console.log('erro: ', error);
        next(error);
    }
};

const editTaskController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const date = new Date();

        const newTask = await editTaskService({ id, name, description, date });

        console.log('controller', newTask);

        return res.status(200).json(newTask);
    } catch (error) {
        console.log('erro: ', error);
        next(error);
    }
};

module.exports = {
    addTaskController,
    findTasksController,
    editTaskController,
};
