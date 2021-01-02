import { ForbiddenError } from "apollo-server-express";
import bcrypt from "bcryptjs";
import {stringArg} from "nexus";
import LoginType from "../type/loginType";
import {getUserByName, updateUserById} from "../utils";
import { createUserToken } from "../../../../core/auth";
import { FIVE_MINUTES, CONNECTION_TRY } from "../../../../core/constants";

export default (t) => 
    t.field("login", {
        type: LoginType,
        args: {
            name: stringArg({required: true}),
            password: stringArg({required: true}),
        },
        async resolve(...params){
            return await login(...params);
        }
    });

const login = async (_, {name, password}) => {
    try {
        const user = await getUserByName(name)
        
        if (!user) {
            throw new Error("connect.login.errors.failLogin");
        }

        if (!user.basic.verified) {
            throw new Error("connect.login.errors.unverified");
        }

        if (!user.active) {
            throw new Error("connect.login.errors.locked");
        }

        if (user?.basic?.signTry?.[CONNECTION_TRY]) {
            if (new Date(user?.basic?.signTry[0]).getTime() > new Date().getTime() - FIVE_MINUTES) {
                await updateUserById(user._id, {
                    $pull: {"basic.signTry": { $lt: new Date(new Date().getTime() - FIVE_MINUTES)} }
                });
                throw new Error("connect.login.errors.tooManyTry");
            }
        }

        if (!(await bcrypt.compare(password, user.basic.password))) {
            await updateUserById(user._id, {
                $push: {"basic.signTry": new Date()}
            });

            throw new Error("connect.login.errors.failLogin");
        }

        const userData = await updateUserById(user._id, {
            $set: {
                "basic.lastLogin": new Date(),
                "basic.signTry": [],
                "updatedAt": new Date(),
            },
        });

        const {accessToken, refreshToken} = await createUserToken(user);

        if (userData?._id) {
            return {
                accessToken,
                refreshToken,
                identity: {
                    ...userData
                },
            }
        }

        throw new Error("connect.login.errors.failLogin")
    } catch (err) {
        throw new ForbiddenError(err)
    }
}