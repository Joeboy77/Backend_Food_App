const logger = require('../utils/logger')

const errorMiddleware = (err, req, res, next) => {
    logger.error(err.stack)

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong'

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV == 'development' && {stack: err.satck})
    })
}

module.exports = errorMiddleware