import { inputObjectType } from "nexus";
import OrderEnum from "../enum/order";

const PaginationParamsInput = inputObjectType({
    name: "PaginationParams",
    definition(t) {
      t.int("page");
      t.int("pageSize");
      t.string("orderKey");
      t.field("orderValue", {type: OrderEnum});
    },
});

export default PaginationParamsInput;