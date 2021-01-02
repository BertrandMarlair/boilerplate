export const CONFIG_PORT = 3002;
export const CONFIG_HOST = 'config';

export const ONE_MINUTE = 60000;
export const FIVE_MINUTES = 300000;
export const FIFTEEN_MINUTES = 900000;
export const THIRTY_MINUTES = 1800000;
export const ONE_HOUR = 3600000;
export const ONE_DAY = 86400000;
export const BCRYPT_ROUNDS = 8;

export const ACCESS_EXPIRES_IN = "3h";
export const REFRESH_EXPIRES_IN = "48h";

export const PAGINATION_DEFAULT_LIMIT = 20;
export const CONNECTION_TRY = 5;

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
    "MONGO_AUTH_HOSTNAME",
    "MONGO_AUTH_NAME",
    "MONGO_AUTH_PORT",
    "MONGO_INITDB_ROOT_USERNAME",
    "MONGO_INITDB_ROOT_PASSWORD",
    "SECRET_FORGOT_PASSWORD",
    "SECRET_SIGNIN",
    "SECRET_MFA",
    "SECRET_REGISTER",
    "DOMAIN",
];


export const getAuthorizationQuery = [
    "signup",
    "signin"
]