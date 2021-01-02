import { inputObjectType } from "nexus";
import FilterOperationInput from "./filterOperation";
import PaginationParamsInput from "./paginationParams";

const PaginationInput = inputObjectType({
    name: "Pagination",
    definition(t) {
      t.list.field("filtrate", {type: FilterOperationInput, nullable: false});
      t.field("pagination", {type: PaginationParamsInput});
    },
});

export default PaginationInput;