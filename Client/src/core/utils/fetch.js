import axios from "axios";
import {ENDPOINT, ACCESS_TOKEN_NAME} from "../constants";
import {getLocalstorage} from "../localstorage/localStorage";

export const fetch = (url, method = "get", data = {}, headers = {}) => {
    return new Promise((resolve) => {
        axios({
            method,
            url: `${ENDPOINT}${url}`,
            data,
            headers: {
                ...headers,
                [ACCESS_TOKEN_NAME]: getLocalstorage(ACCESS_TOKEN_NAME),
            },
        })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                resolve({...error, error: true});
            });
    });
};
