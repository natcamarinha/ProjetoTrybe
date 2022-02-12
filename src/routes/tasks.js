const router = require('express').Router();

const {
    addTaskController,
    findTasksController,
    editTaskController,
    deleteTaskController,
} = require('../controllers/tasks');

router.post('/tasks', addTaskController);
router.get('/tasks', findTasksController);
router.put('/tasks/:id', editTaskController);
router.delete('/tasks/:id', deleteTaskController);

module.exports = router;
