const router = require('express').Router();

const {
    addTaskController,
    findTasksController,
} = require('../controllers/tasks');

router.post('/tasks', addTaskController);
router.get('/tasks', findTasksController);

module.exports = router;