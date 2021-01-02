import {GraphQLClient} from "graphql-request";
import {REFRESH_TOKEN_NAME, ENDPOINT_HTTP, ACCESS_EXPIRES_IN, ACCESS_TOKEN_NAME} from "../constants";
import {getLocalstorage, setLocalstorage} from "../localstorage/localStorage";
import {decode} from "jsonwebtoken";

const client = new GraphQLClient(ENDPOINT_HTTP, {
    headers: {
        "refresh-token": getLocalstorage(REFRESH_TOKEN_NAME),
    },
});

const newAccessToken = `
    query refreshTokens {
        refreshTokens {
            accessToken
            refreshToken
        }
    }
`;

export const fetchAccessToken = () => {
    console.log("$$$$$$$$$ASK FOR A NEW TOKEN$$$$$$$$$$$");
    return client.request(newAccessToken);
};

export const handleResponse = (operation, accessTokenField, logout) => (response) => {
    const newToken = response.refreshTokens;

    if (newToken && newToken.accessToken) {
        const accessTokenDecrypted = decode(newToken.accessToken);

        setLocalstorage(ACCESS_TOKEN_NAME, newToken.accessToken);
        setLocalstorage(REFRESH_TOKEN_NAME, newToken.refreshToken);
        setLocalstorage(ACCESS_EXPIRES_IN, accessTokenDecrypted.exp);
    } else {
        logout();
    }
};

export const isTokenExpired = (token) => {
    const tokenExpired = getLocalstorage(token);

    if (tokenExpired < Date.now() / 1000) {
        return true;
    }
    return false;
};
