import { objectType } from "nexus";

const DeleteType = objectType({
    name: "Delete",
    definition(t) {
        t.int("id");
    }
});

export default DeleteType;