import jwt from "jsonwebtoken";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "../constants";
import {deleteLocalstorage, getLocalstorage} from "../localstorage/localStorage";

const isAuthenticated = () => {
    const token = getLocalstorage(ACCESS_TOKEN_NAME);

    if (token) {
        try {
            jwt.decode(token.replace("Bearer ", ""));
            return true;
        } catch (err) {
            deleteLocalstorage(ACCESS_TOKEN_NAME);
            deleteLocalstorage(REFRESH_TOKEN_NAME);
            return false;
        }
    }
    return false;
};

export default isAuthenticated;
