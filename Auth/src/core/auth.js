import {sign, verify} from "jsonwebtoken";
import {AuthenticationError} from "apollo-server-core";
import {ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN} from "./constants";

export const createUserToken = async (user) => {

    const {PRIVATE_KEY, PUBLIC_KEY, SECRET_REGISTER} = process.env;

    const payload = {
        _id: user._id,
        name: user.name,
        type: user.type,
        permissions: user.permissions,
    };

    const signAccessOptions = {
        expiresIn:  ACCESS_EXPIRES_IN,
        algorithm:  "RS256",
    };

    const signRefreshOptions = {
        expiresIn:  REFRESH_EXPIRES_IN,
        algorithm:  "RS256",
    };

    const accessToken = await sign(payload, {key: PRIVATE_KEY, passphrase: SECRET_REGISTER}, signAccessOptions);
    const refreshToken = await sign({_id: user._id}, {key: PRIVATE_KEY, passphrase: SECRET_REGISTER}, signRefreshOptions);

    verify(accessToken, PUBLIC_KEY, {
      algorithms: ['RS256'],
    });

    return {
        accessToken,
        refreshToken,
    }
}

export const getPayloadFromToken = async ({token}) => {
    if (!token) {
        throw new AuthenticationError(
            "You must supply a JWT for authorization.",
        );
    }

    const {PUBLIC_KEY} = process.env;

    try {
        return verify(token, PUBLIC_KEY, {algorithm: ["RS256"]});
    } catch (err) {
        console.log("err", err);
        throw new AuthenticationError("Invalid JWT");
    }
};
