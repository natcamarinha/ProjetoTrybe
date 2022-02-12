const router = require('express').Router();

const { addTaskController } = require('../controllers/tasks');

router.post('/tasks', addTaskController);

module.exports = router;