import EmailScalar from "./scalar/email";
import JsonScalar from "./scalar/json";
import TimestampScalar from "./scalar/timestamp";
import DeleteType from "./type/Delete";
import StatusType from "./type/Status";

export default {
    scalar: [
        EmailScalar,
        TimestampScalar,
        JsonScalar,
    ],
    input: [
        DeleteType,
        StatusType
    ]
};