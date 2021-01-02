import {verify} from "jsonwebtoken";
import {AuthenticationError} from "apollo-server-core";
import getPublicKey from "./getPublicKey";
import memoize from "memoizee";

const memoized = memoize(getPublicKey);

export const getPayloadFromToken = async (accessToken) => {
    if (!accessToken) {
        throw new AuthenticationError(
            "You must supply a JWT for authorization.",
        );
    }

    const publicKey = await memoized();

    try {
        return verify(accessToken.replace("Bearer ", ""), publicKey, {algorithm: ["RS256"]});
    } catch (err) {
        console.log(err);
        throw new AuthenticationError("Invalid JWT");
    }
};
