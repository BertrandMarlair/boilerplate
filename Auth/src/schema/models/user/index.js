import registerInput from "./input/register";
import signin from "./mutation/signin";
import UserType from "./type/user";
import LoginType from "./type/loginType";
import getCurrentUser from "./query/getCurrentUser"
import login from "./mutation/login";
import TypeEnum from "./enum/typeEnum";
import editUserInput from "./input/editUser";
import checkAuthUser from "./query/checkAuthUser";

export default {
    type: [
        UserType,
        LoginType,
    ],
    mutation: [
        signin,
        login,
    ],
    query: [
        getCurrentUser,
        checkAuthUser,
    ],
    input: [
        registerInput,
        editUserInput,
    ],
    enum: [
        TypeEnum,
    ]
};
