/* eslint-disable no-undef */
import { scalarType } from "nexus";

const EmailScalar = scalarType({
    name: "Email",
    asNexusMethod: "email",
    description: "Email custom scalar type",
    Email: (...args) => GraphQLEmail(...args)
});

export default EmailScalar;
