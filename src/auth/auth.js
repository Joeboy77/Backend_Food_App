const passport = require('passport')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

passport.use(User.createStrategy())

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

const authenticate = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(401).json({message: 'Invalid email or password'})
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if(!isValidPassword) {
            return res.status(401).json({message: 'Invalid email or password'})
        }
        const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY, {
            expiresIn: '1h',
        })
        res.json({ token })
    } catch (error) {
        next(err)
    }
}
module.exports = authenticate