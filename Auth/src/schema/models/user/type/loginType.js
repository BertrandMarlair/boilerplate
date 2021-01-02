import { objectType } from "nexus";
import UserType from "./user";

const LoginType = objectType({
    name: "Login",
    definition(t) {
        t.field("identity", { type: UserType, nullable: true });
        t.string("accessToken", {nullable: true});
        t.string("refreshToken", {nullable: true});
    }
});

export default LoginType;