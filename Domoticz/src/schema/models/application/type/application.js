import { objectType } from "nexus";

const ApplicationType = objectType({
    name: "Application",
    definition(t) {
        t.field("_id", { type: "ID" });
        t.string("title");
        t.string("description");
    }
});

export default ApplicationType;