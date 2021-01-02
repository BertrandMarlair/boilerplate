import { ForbiddenError } from "apollo-server-express";

import registerInput from "../input/register";
import UserType from "../type/user";
import {BCRYPT_ROUNDS} from "../../../../core/constants";
import {AuthenticationError} from "apollo-server-express";
import bcrypt from "bcryptjs";
import {getUserByName} from "../utils";
import {insertOne} from "../../../../core/mongo";

export default (t) => 
    t.field("signin", {
        type: UserType,
        args: {
            user: registerInput
        },
        async resolve(...params){
            return await signin(...params);
        }
    });

const signin = async (_, {user: userInput}) => {
    try {
        const user = await getUserByName(userInput.name)

        if (user) {
            throw new AuthenticationError("connect.signin.errors.alreadyRegistered");
        }

        if (userInput?.password !== userInput?.passwordConfirmation) {
            throw new AuthenticationError("auth.identity.invalidPasswordConfirmation");
        }
        
        if (userInput?.password.length < 8) {
            throw new AuthenticationError("error.validation.passwordIsTooSmall");
        }

        const hash = await bcrypt.hash(userInput.password, BCRYPT_ROUNDS);

        const userData = await insertOne("users", {
            name: userInput.name,
            type: userInput.type,
            active: true,
            permission: "guest",
            basic: {
                verified: false,
                password: hash,
                createdAt: new Date(),
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        
        if(userData && userData._id){
            return userData;
        }

        throw new Error("connect.register.failedToCreateOnPortal")
    } catch (err) {
        throw new ForbiddenError(err)
    }
}