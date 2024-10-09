const Nutrition = require('../models/nutritionModel')

exports.searchFood = async(req, res) => {
    try {
        const {query, healthConditions} = req.query;
        let searchCriteria = { name: new RegExp(query, '1')}

        if(healthConditions){
            searchCriteria.suitablefor = { $in: healthConditions.split(',')}
        }

        const foods = await Nutrition.find(searchCriteria)
        res.send(foods)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getFoodDetails = async(req, res) => {
    try {
        const food = await Nutrition.findById(req.params.id)

        if(!food) {
            return res.status(404).send({error: 'Food not found'})
        }
        res.send(food)
    } catch (error) {
        res.status(500).send(error)
    }
}