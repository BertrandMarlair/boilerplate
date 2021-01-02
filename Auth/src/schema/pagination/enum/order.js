import { enumType } from "nexus";

const OrderEnum = enumType({
    name: "Order",
    members: ["DESC", "ASC"],
    description: "Order for filterate"
});

export default OrderEnum;
