import { inputObjectType } from "nexus";
import LogicalOperatorEnum from "../enum/logicalOperator";

const FilterInput = inputObjectType({
    name: "Filter",
    definition(t) {
      t.string("operator");
      t.list.string("values");
      t.field("inner_stack_operator", {type: LogicalOperatorEnum});
    },
});

export default FilterInput;