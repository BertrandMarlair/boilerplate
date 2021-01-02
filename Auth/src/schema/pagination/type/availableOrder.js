import { objectType } from "nexus";

const AvailableOrderType = objectType({
    name: "AvailableOrder",
    definition(t) {
        t.string("label", { nullable: false });
        t.string("key", { nullable: false });
    }
});

export default AvailableOrderType;
