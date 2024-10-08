const authenticate = require('../auth/auth')

const login = async(req, res, next) => {
    try{
        const token = await authenticate(req, res, next)
        res.json({ token })
    } catch(err) {
        next(err)
    }
}

module.exports = { login }