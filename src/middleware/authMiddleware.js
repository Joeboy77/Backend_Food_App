const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/config')

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, config.jwtSecret)
        const user = await User.findOne({_id: decoded.userId})

        if(!user) {
            throw new Error()
        }

        req.token = token;
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ error: 'Authentication required...'})
    }
}

module.exports = authMiddleware