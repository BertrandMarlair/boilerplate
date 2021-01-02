import { objectType } from "nexus";

const KeyRingType = objectType({
    name: "KeyRing",
    definition(t) {
        t.string("accessPublicKey", {nullable: false});
    }
});

export default KeyRingType;