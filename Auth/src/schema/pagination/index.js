import LogicalOperatorEnum from "./enum/logicalOperator";

import FilterOperationInput from "./input/filterOperation";
import FilterInput from "./input/filter";

import AvailableFilterType from "./type/availableFilter";
import OrderEnum from "./enum/order";
import PaginationInput from "./input/pagination";
import PaginationParamsInput from "./input/paginationParams";

export default {
    enum: [
        LogicalOperatorEnum,
        OrderEnum,
    ],
    input: [
        FilterInput,
        FilterOperationInput,
        PaginationInput,
        PaginationParamsInput,
    ],
    type: [
        AvailableFilterType,
    ]
};