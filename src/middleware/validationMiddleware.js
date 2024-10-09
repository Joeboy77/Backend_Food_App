const Joi = require('joi')

const validateUser = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        healthConditions: Joi.array().items(Joi.string()),
        allergies: Joi.array().items(Joi.string()),
        bloodGroup: Joi.string(),
        location: Joi.string,
    })

    const { error } = schema.validate(req.body)
    if(error) {
        return res.status(400).send({ error: error.details[0].message })
    }
    next()
}

const validateMeal = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required,
        ingredients: Joi.array().items(Joi.string()).required(),
        mealType: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snack').required(),
        date: Joi.date()
    })

    const { error } = schema.validate(req.body)
    if(error){
        return res.status(400).send({error: error.details[0].message})
    }
    next()
}

module.exports = {
    validateUser,
    validateMeal
}