const router = require('express').Router();

const {
    addTaskController,
    findTasksController,
    editTaskController,
    deleteTaskController,
} = require('../controllers/tasks');

const auth = require('../middlewares/auth');

router.post('/tasks', auth, addTaskController);
router.get('/tasks', auth, findTasksController);
router.put('/tasks/:id', auth, editTaskController);
router.delete('/tasks/:id', auth, deleteTaskController);

module.exports = router;
