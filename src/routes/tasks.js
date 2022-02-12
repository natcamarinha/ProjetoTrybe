const router = require('express').Router();

const {
    addTaskController,
    findTasksController,
    editTaskController,
} = require('../controllers/tasks');

router.post('/tasks', addTaskController);
router.get('/tasks', findTasksController);
router.put('/tasks/:id', editTaskController);

module.exports = router;
