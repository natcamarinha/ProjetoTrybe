const {
    addTaskService,
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

module.exports = {
    addTaskController,
};
