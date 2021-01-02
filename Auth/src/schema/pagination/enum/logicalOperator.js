import { enumType } from "nexus";

const LogicalOperatorEnum = enumType({
    name: "LogicalOperator",
    members: ["and", "or"],
    description: "LogicalOperator for filterate"
});

export default LogicalOperatorEnum;
