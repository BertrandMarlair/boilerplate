import { objectType } from "nexus";
import PermissionEnum from "../enum/permissionEnum";
import TypeEnum from "../enum/typeEnum";

const UserType = objectType({
    name: "UserAuth",
    definition(t) {
        t.field("_id", { type: "ID" });
        t.string("name", {nullable: false});
        t.string("type", {nullable: false, type: TypeEnum});
        t.string("permission", {nullable: false, type: PermissionEnum});
        t.timestamp("updatedAt");
        t.timestamp("createdAt");
    }
});

export default UserType;