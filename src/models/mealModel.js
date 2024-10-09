const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nutrition'
    }],
    totalColaries: Number,
    totalProtein: Number,
    totalCarbs: Number,
    mealType: {
        type: String,
        enum: ['breakfast', 'launch', 'dinner', 'snack']
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Meal', mealSchema)