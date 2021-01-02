import keyRingType from "./type/keyRing";
import keyRing from "./query/keyRing";
import TokensType from "./type/TokensType";
import refreshTokens from "./query/refreshTokens";

export default {
    type: [
        keyRingType,
        TokensType,
    ],
    query: [
        keyRing,
        refreshTokens,
    ],
};
