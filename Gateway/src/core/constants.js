export const CONFIG_PORT = 3002;
export const CONFIG_HOST = 'config';
export const ONE_MINUTE = 60000;
export const FIVE_MINUTES = 300000;
export const FIFTEEN_MINUTES = 900000;
export const THIRTY_MINUTES = 1800000;
export const ONE_HOUR = 3600000;
export const ONE_DAY = 86400000;
export const FILE_SIZE = "500mb";

export const NEEDED_ENV = [
    "NODE_ENV",
    "GATEWAY_HOST",
    "GATEWAY_PORT",
    "REDIS_HOST",
    "REDIS_PORT",
    "DOMOTICZ_HOST",
    "DOMOTICZ_PORT",
    "GRAPHQL_QUERY_MAX_DEPTH",
    "REFRESH_TOKEN",
    "ACCESS_TOKEN",
    "AUTH_HOST",
    "AUTH_PORT",
    "DOMAIN",
    "CORS",
    "SECRET_REGISTER",
];

export const getAuthorizationQueryDomoticz = ["register"];
export const getAuthorizationQueryAuthentification = ["login", "keyRing", "signin"];