import { stringArg } from "nexus";
import KeyRingType from "../type/keyRing";

export default (t) => 
    t.field("keyRing", {
        type: KeyRingType,
        args: {
            token: stringArg({required: true}),
        },
        nullable: false,
        async resolve(_, {token}) {
            const {SECRET_REGISTER, PUBLIC_KEY} = process.env;

            if (token === SECRET_REGISTER) {
                return {accessPublicKey: PUBLIC_KEY};
            }

            throw new Error("Invalid secret");
        },
    });
