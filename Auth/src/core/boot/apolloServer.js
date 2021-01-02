import depthLimit from "graphql-depth-limit";
import path from "path";
import {ApolloServer} from "apollo-server-express";
import Memoizer from "../memoizer";
import {getPayloadFromToken} from "../auth";
import {makeSchema } from "nexus";
import schemaModels from "../../schema/index";
import generateQuery from "../schemaModels/generateQuery";
import generateType from "../schemaModels/generateType";
import generateMutation from "../schemaModels/generateMutation";
import generateScalar from "../schemaModels/generateScalar";
import generateInput from "../schemaModels/generateInput";
import generateEnum from "../schemaModels/generateEnum";
import generateUnion from "../schemaModels/generateUnion";
import generateSubscription from "../schemaModels/generateSubscription";

const {GRAPHQL_QUERY_MAX_DEPTH} = process.env;

const formatResponse = (response, {context}) => {
    context.memoizer.clear();

    return response;
};

const formatError = err => {
    console.log("_________________________________");
    console.log(err);
    console.log("_________________________________");
    return err;
};

const buildContext = async (event) => {
    let token, currentUser;

    const headers = event.req && event.req.headers;
    const connection = event.connection && event.connection.context;

    if (headers) {
        const accessToken = headers["access-token"];
        if (accessToken && accessToken !== "null" && accessToken !== "undefined") {
            token = accessToken.replace("Bearer ", "");
            currentUser = await getPayloadFromToken({token});
        }
    }

    if (connection) {
        if(connection && connection.headers.context) {
            const ctx = connection.headers.context;
            const accessToken = ctx.token || ctx["access-token"];
            if (accessToken) {
                token = accessToken.replace("Bearer ", "");
                currentUser = await getPayloadFromToken({token});
            }
        }
    }

    return {
        headers,
        memoizer: new Memoizer(),
        token,
        identityEmail: currentUser && currentUser.identity_email,
        currentUser,
        refreshToken: headers["refresh-token"],
    };
};

const schema = makeSchema({
    types: [
        generateQuery(schemaModels),
        generateType(schemaModels),
        generateMutation(schemaModels),
        generateSubscription(schemaModels),
        generateScalar(schemaModels),
        generateInput(schemaModels),
        generateEnum(schemaModels),
        generateUnion(schemaModels),
    ],
    outputs: {
        schema: path.join(
          __dirname.replace(/\/dist$/, "/bin"),
          "../../bin/portal_api_schema.graphql"
        ),
        typegen: path.join(
          __dirname.replace(/\/dist$/, "/bin"),
          "../../bin/portal_api_schema_typegen.ts"
        ),
    },
});

export const createServer = (dataLayer, playground = true) =>
    new ApolloServer({
        schema,
        validationRules: [depthLimit(GRAPHQL_QUERY_MAX_DEPTH)],
        playground,
        introspection: true,
        tracing: true,
        formatError,
        formatResponse,
        context: e => buildContext(e, dataLayer),
        subscriptions: {
            onConnect: async (connectionParams) => {
                if(connectionParams && connectionParams.headers.context) {
                    const ctx = connectionParams.headers.context;
                    const token = ctx.token || ctx["access-token"];
                    if (token) {
                        return connectionParams;
                    }
                }
                throw new Error('Missing auth token!');
            },
        },
    });
