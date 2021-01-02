import { inputObjectType } from "nexus";
import FilterInput from "./filter";
import LogicalOperatorEnum from "../enum/logicalOperator";

const FilterOperationInput = inputObjectType({
    name: "FilterOperation",
    definition(t) {
        t.field("inner_stack_operator", {type: LogicalOperatorEnum});
        t.string("key", {nullable: false});
        t.list.field("filters", {type: FilterInput, nullable: false });
    },
});

export default FilterOperationInput;