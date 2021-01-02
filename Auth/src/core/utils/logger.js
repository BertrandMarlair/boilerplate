import winston from "winston"

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({
            timestamp: true,
            level: "debug",
            handleExceptions: true,
            json: false,
            colorize: true,
        }),
    ],
    exitOnError: false,
});

logger.stream = {
    write: message => logger.info(message.replace(/\n$/, "")),
};

export default logger;