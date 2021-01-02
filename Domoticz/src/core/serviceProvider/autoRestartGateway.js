import Redis from "ioredis";

const {REDIS_HOST, REDIS_PORT} = process.env;

export const pub = () => {
    if(process.env.INTERNAL === "true") {
        return null;
    }
    return new Redis(REDIS_PORT, REDIS_HOST);
} 

export const autoRestartGateway = () => {
    if(process.env.INTERNAL !== "true") {
        pub().publish("updateServer", "Restart Portal API");
    }
};
