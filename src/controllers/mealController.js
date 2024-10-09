const Meal = require('../models/mealModel')
const Nutrition = require('../models/nutritionModel')
const AIRecommendationService = require('../services/aiRecommendationService')

exports.createMeal = async (req, res) => {
    try {
        const meal = new Meal({
            ...req.body,
            user: req.user._id
        })
        await meal.save();
        res.status(201).send(meal)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.getMeals = async (req, res) => {
    try {
        const meals = await Meal.find({user: req.user._id}).populate('ingredients');
        res.send(meals);
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getRecommendedMealPlan = async (req, res) => {
    try {
        const days = req.query.days ? parseInt(req.query.days) : 3;

        const mealPlan = await AIRecommendationService.generateMealPlan(req.user._id, days)
        res.send(mealPlan)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getRecommendedMeal = async (req, res) => {
    try {
        const { mealType } = req.query
        if(!['breakfast', 'lunch', 'dinner', 'snack'].includes(mealType)){
            return res.status(400).send({ error: 'Invalid meal type' })
        }
        const meal = await AIRecommendationService.recommendMeal(req.user, mealType);
        res.send(meal)
    } catch (error) {
        res.status(500).send(error)
    }
}

