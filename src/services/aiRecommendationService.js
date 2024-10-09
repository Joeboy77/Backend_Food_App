const { getFoodDetails } = require('../controllers/nutritionController')
const Meal = require('../models/mealModel')
const Nutrition = require('../models/nutritionModel')
const User = require('../models/User')

class AIRecommendationService {
    async generateMealPlan(userId, days = 3){
        const user = await User.findById(userId)
        const meals = []

        for(let i = 0; i < days; i++) {
            const dailyMeals = await this.generateDailyMeals(user)
            meals.push(dailyMeals)
        }
        return meals
    }

    async generateDailyMeals(user) {
        const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
        const dailyMeals = {}

        for(const type of mealTypes){
            dailyMeals[type] = await this.recommendMeal(user, type)
        }
        return dailyMeals
    }

    
    async recommendMeal(user, mealType){
        const userConditions = user.healthConditions
        const userAllergies = user.allergies;

        const suitableFoods = await Nutrition.find({
            suitableFor: { $in: userConditions },
            unsuitableFor: { $in: userAllergies }
        })


        const recommendation = this.balanceMeal(suitableFoods, mealType)

        return new Meal({
            user: user._id,

            name: `${mealType} for ${user.username}`,

            ingredients: recommendation.map(food => food._id),

            totalColaries: recommendation.reduce((sum, food) => sum + food.colaries, 0),

            totalProtein: recommendation.reduce((sum, food) => sum + food.protein, 0),

            totalCarbs:recommendation.reduce((sum, food) => sum + food.carbs, 0),
            
            totalFat: recommendation.reduce((sum, food) => sum + food.fat, 0),

            mealType: mealType
        })
    }

    

    balanceMeal(foods, mealType) {
        // Implement logic to balance the meal based on nutritional needs
    // This is a simplified version and can be enhanced with more sophisticated algorithms

    const mealSize = mealType == 'snack' ? 2 : 4
    return foods
        .sort(() => 0.5 - Math.random())
        .slice(0, mealSize)
    }
}

module.exports = new AIRecommendationService