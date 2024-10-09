const mongoose = require('mongoose')

const nutritionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    colaries: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    vitamins: [{
        name: String, 
        amount: Number,
        unit: String,
    }],
    minerals: [{
        name: String, 
        amount: Number,
        unit: String,
    }],
    foodGroup: String,
    suitableFor: [String],  
    unsuitableFor: [String]
})

module.exports = mongoose.model('Nutrition', nutritionSchema)

