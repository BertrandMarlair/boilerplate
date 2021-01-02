export const CONFIG_PORT = 3002;
export const CONFIG_HOST = 'config';

export const ONE_MINUTE = 60000;
export const FIVE_MINUTES = 300000;
export const FIFTEEN_MINUTES = 900000;
export const THIRTY_MINUTES = 1800000;
export const ONE_HOUR = 3600000;
export const ONE_DAY = 86400000;

export const NEEDED_ENV = [
    "NODE_ENV",
    "GATEWAY_HOST",
    "GATEWAY_PORT",
    "SALTROUNDS",
    "REDIS_HOST",
    "REDIS_PORT",
    "DOMOTICZ_HOST",
    "DOMOTICZ_PORT",
    "AUTH_HOST",
    "AUTH_PORT",
    "GRAPHQL_QUERY_MAX_DEPTH",
    "GRAPHQL_MAX_OBJECTS_LIMIT",
    "USER_COOKIE_NAME",
    "CSRF_HEADER_NAME",
    "ACCESS_TOKEN",
    "REFRESH_TOKEN",
    "DOMAIN",
    "SECRET_REGISTER",
];

export const PUBSUB_TYPES = {
    NOTIFY_CLIENT_LOG: "NOTIFY_CLIENT_LOG",
};