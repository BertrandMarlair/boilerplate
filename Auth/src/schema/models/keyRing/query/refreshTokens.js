import { decode } from "jsonwebtoken";
import { createUserToken } from "../../../../core/auth";
import { getUserById } from "../../user/utils";
import TokensType from "../type/TokensType";

export default (t) => 
    t.field("refreshTokens", {
        type: TokensType,
        nullable: false,
        async resolve(_, args, {refreshToken: refreshTokenCTX}) {

            if(!refreshTokenCTX) {
                throw new Error("missing refresh-token");
            }

            const {_id} = decode(refreshTokenCTX.replace("Bearer ", ""));

            const user = await getUserById(_id);
            
            if (!user) {
                throw new Error("fail to get user data");
            }

            const {accessToken, refreshToken} = await createUserToken(user);

            return {accessToken, refreshToken}
        },
    });
