import { AuthenticationError } from "apollo-server-express";
import {verify} from "jsonwebtoken";
import memoize from "memoizee";
import getPublicKey from "./getPublicKey";

const memoized = memoize(getPublicKey);

export default async accessToken => {
    try {
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
    } catch (err) {
        throw new Error("JWT invalid.");
    }
};
