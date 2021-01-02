
import { enumType } from "nexus";

const PermissionEnum = enumType({
    name: "PermissionEnum",
    members: ["guest", "member", "admin"],
    description: "Permission for user"
});

export default PermissionEnum;
