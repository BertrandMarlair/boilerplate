import { objectType } from "nexus";

const ResponseType = objectType({
    name: "Response",
    definition(t) {
        t.boolean("ok");
        t.string("error", {nullable: true});
    }
});

export default ResponseType;