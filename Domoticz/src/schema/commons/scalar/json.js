import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

import { scalarType } from "nexus";

const JsonScalar = scalarType({
    name: "Json",
    asNexusMethod: "json",
    description: "Json custom scalar type",
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
});

export default JsonScalar;
