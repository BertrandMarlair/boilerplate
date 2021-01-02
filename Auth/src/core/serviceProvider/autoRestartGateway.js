import Redis from "ioredis";

const {REDIS_HOST, REDIS_PORT} = process.env;

export const pub = () => {
    return new Redis(REDIS_PORT, REDIS_HOST);
} 

export const autoRestartGateway = () => {
    pub().publish("updateServer", "Restart Portal API");
};
