const router = require('express').Router();

const { 
    addUserController,
    findUsersController,
} = require('../controllers/users');

router.post('/users', addUserController);
router.get('/users', findUsersController);

module.exports = router;
