import { objectType } from "nexus";

const AvailableFilterType = objectType({
    name: "AvailableFilter",
    definition(t) {
        t.string("label", { nullable: false });
        t.string("key", { nullable: false });
        t.string("type", { nullable: false });
        t.string("formType", { nullable: false });
        t.list.string("valid_operators", { nullable: false });
    }
});

export default AvailableFilterType;
