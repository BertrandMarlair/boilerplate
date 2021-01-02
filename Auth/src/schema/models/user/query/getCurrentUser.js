import { AuthenticationError } from "apollo-server-express";
import UserType from "../type/user";
import { getUserById } from "../utils";

export default (t) => 
    t.field("getCurrentUser", {
        type: UserType,
        nullable: false,
        async resolve(_, args, {currentUser}) {
            const user = await getUserById(currentUser._id)

            if (!user) {
                throw new AuthenticationError("fail to found user");
            }

            return user;
        },
    });
