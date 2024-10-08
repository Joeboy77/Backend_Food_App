const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

exports.register = async (req, res) => {
    try {
        const user = new User(req.body);
        await User.save()
        res.status(201).send({message: 'User registered successfully'})
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.login = async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        
        if(!user || !(await bcrypt.compare(req.body.password, user.password))){
            return res.status(401).send({error: 'Invalid credentials'})
        }
        const token = jwt.sign({userId: user._id}, config.jwtSecret)
        res.send({ user, token})
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.updateProfile = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'email', 'healthConditions', 'allergies', 'bloodGroup', 'location']
    const isValidOperation = updates.every(update => allowedUpdates.includes(updates))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try{
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(error) {
        res.status(400).send(error)
    }
}