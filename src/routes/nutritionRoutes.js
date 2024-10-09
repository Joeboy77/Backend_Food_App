const express = require('express')
const nutritionController = require('../controllers/nutritionController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/search', authMiddleware, nutritionController.searchFood)
router.get('/:id', authMiddleware, nutritionController.getFoodDetails)

module.exports = router