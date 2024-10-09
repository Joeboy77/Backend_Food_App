const express = require('express')
const mealController = require('../controllers/mealController')
const authMiddleware = require('../middleware/authMiddleware')
const {validateMeal} = require('../middleware/validationMiddleware')

const router = express.Router();

router.post('/', authMiddleware, validateMeal, mealController.createMeal)
router.get('/', authMiddleware, mealController.getMeals)
router.get('/recommended-plan', authMiddleware, mealController.getRecommendedMealPlan);
router.get('/recommended-meal', authMiddleware, mealController.getRecommendedMeal);

module.exports = router