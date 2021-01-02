import {ApolloServer} from "apollo-server-express";
import {mergeSchemas} from "graphql-tools";
import Memoizer from "./memoizer";
import depthLimit from "graphql-depth-limit";
import {formatError} from "./formatError";
import {formatResponse} from "./formatResponse";

const buildContext = event => {
    let token;
    const headers = event.req && event.req.headers;
    const connection = event.connection;
    if (headers) {
        const accessToken = headers['access-token'];

        if (accessToken) {
            token = accessToken.replace("Bearer ", "");
        }
    }
    if (connection) {
        const accessToken = connection.context['access-token'];

        if (accessToken) {
            token = accessToken.replace("Bearer ", "");
        }
    }

    return {
        headers: headers || connection,
        token,
        memoizer: new Memoizer(),
    };
};

export const createServer = (playground = true, schemas) => {
    const {GRAPHQL_QUERY_MAX_DEPTH} = process.env

    return new ApolloServer({
        schema: mergeSchemas({schemas}),
        validationRules: [depthLimit(GRAPHQL_QUERY_MAX_DEPTH)],
        playground,
        introspection: true,
        tracing: true,
        context: buildContext,
        formatError,
        formatResponse,
    });
};
