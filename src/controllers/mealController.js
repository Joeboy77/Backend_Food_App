const Meal = require('../models/mealModel')
const Nutrition = require('../models/nutritionModel')

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