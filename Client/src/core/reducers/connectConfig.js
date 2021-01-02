import jwt from "jsonwebtoken";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME, REFRESH_EXPIRES_IN, ACCESS_EXPIRES_IN} from "../constants";
import {getLocalstorage, deleteLocalstorage} from "../localstorage/localStorage";

export const getUserData = () => {
    try {
        const token = getLocalstorage(ACCESS_TOKEN_NAME).replace("Bearer ", "");
        const user = jwt.decode(token);

        return user;
    } catch (err) {
        return false;
    }
};

export const initialState = {
    connected: !!getLocalstorage(ACCESS_TOKEN_NAME),
    user: getUserData(),
};

export const CONNECTED = "CONNECTED";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";

export const toggleConnection = () => ({
    type: CONNECTED,
});

export default function LoginReducer(state = initialState, {type, payload}) {
    switch (type) {
        case CONNECTED:
            return {
                ...state,
                connected: !!getLocalstorage(ACCESS_TOKEN_NAME),
                user: {...getUserData(), ...payload, ...state.user},
            };
        case LOGOUT:
            deleteLocalstorage(ACCESS_TOKEN_NAME);
            deleteLocalstorage(REFRESH_TOKEN_NAME);
            deleteLocalstorage(REFRESH_EXPIRES_IN);
            deleteLocalstorage(ACCESS_EXPIRES_IN);
            return {
                user: {},
                connected: false,
            };
        case UPDATE_USER_INFO:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...payload,
                },
            };
        default:
            return state;
    }
}
