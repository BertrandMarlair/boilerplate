import { arg } from "nexus";

import FilterOperationInput from "./input/filterOperation";
import PaginationParamsInput from "./input/paginationParams";

export const paginationInput = {
    filtrate: arg({ type: FilterOperationInput, list: true}),
    pagination: PaginationParamsInput,
}