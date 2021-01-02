import { enumType } from "nexus";

const TypeEnum = enumType({
    name: "TypeEnum",
    members: ["user", "device"],
    description: "Type for user"
});

export default TypeEnum;
