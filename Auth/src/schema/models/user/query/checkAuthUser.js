import UserType from "../type/user";
import {getPayloadFromToken} from "../../../../core/auth";
import { AuthenticationError } from "apollo-server-express";
import { getUserById } from "../utils";

export default (t) => 
    t.field("checkAuthUser", {
        type: UserType,
        nullable: false,
        async resolve(_, args, {token, currentUser}) {
            if (!token) {
                throw new AuthenticationError("jwt not exist");
            }
            
            const user = await getPayloadFromToken({token: token.replace("Bearer ", "")});

            if (!user) {
                throw new AuthenticationError("invalid jwt");
            }
            
            const authUser = await getUserById(currentUser._id)
            
            console.log("authUser", authUser);
            if (!authUser) {
                throw new AuthenticationError("fail to found user");
            }

            if (!authUser.basic.verified) {
                throw new Error("connect.login.errors.unverified");
            }
    
            if (!authUser.active) {
                throw new Error("connect.login.errors.locked");
            }

            return authUser
        },
    });
