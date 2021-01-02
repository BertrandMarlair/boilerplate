import { objectType } from "nexus";

const TokensType = objectType({
    name: "TokensType",
    definition(t) {
        t.string("accessToken", {nullable: false});
        t.string("refreshToken", {nullable: false});
    }
});

export default TokensType;