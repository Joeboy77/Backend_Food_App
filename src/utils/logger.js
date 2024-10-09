const winston = require('winston')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'nutri-app'},
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error'}),
        new winston.transports.File({ filename: 'combined-log'})
    ]
})

if(process.env !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }))
}

module.exports = logger