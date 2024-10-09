const express = require('express')
const mealController = require('../controllers/mealController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/', authMiddleware, mealController.createMeal)
router.get('/', authMiddleware, mealController.getMeals)

module.exports = router