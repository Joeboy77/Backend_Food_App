const express = require('express');
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { validateUser } = require('../middleware/validationMiddleware');


const router = express.Router();

router.post('/register', validateUser, userController.register)
router.post('/login', userController.login);
router.put('/profile', authMiddleware, validateUser, userController.updateProfile)

module.exports = router