import { scalarType } from "nexus";

const TimestampScalar = scalarType({
    name: "Timestamp",
    asNexusMethod: "timestamp",
    description: "Unix Milliseconds Timestamp",
    serialize(value) {
        if (isNaN(value)) {
            throw new Error("Timestamp isn't a valid timestamp value");
        }
        return new Date(value).getTime();
    },
    parseValue(value) {
        if (isNaN(parseFloat(value))) {
            throw new Error("Timestamp isn't a valid timestamp value");
        }
        return new Date(parseFloat(value)).getTime();
    },
    parseLiteral({value}) {
        return new Date(this.parseValue(value)).getTime();
    },
});

export default TimestampScalar;
