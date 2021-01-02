import WebSocket from "ws";
import {split} from "apollo-link";
import {HttpLink} from "apollo-link-http";
import {WebSocketLink} from "apollo-link-ws";
import {setContext} from "apollo-link-context";
import {getMainDefinition} from "apollo-utilities";
import Warning from "./utils/warning";
import {fetcher} from "./fetcher";
import {introspectSchema, makeRemoteExecutableSchema} from "graphql-tools";
import {onError} from "apollo-link-error";

export const getRemoteSchema = async params => {
    const uri = `http://${params.domain}/${params.httpLocation}`;

    let remoteError = onError(({ networkError, graphQLErrors }) => {
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        console.log(networkError, graphQLErrors)
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
		if (graphQLErrors) {
			graphQLErrors.forEach((val) => {
				Object.setPrototypeOf(val, Error.prototype);
			});
		}
	});

    try {
        const httpLink = new HttpLink({
            uri,
            fetch: fetcher,
        });

        let link;

        if (params.subscription) {
            const wsLink = operation => {
                const context = operation.getContext();
                const connectionParams = context.graphqlContext || {};
                const client = new WebSocketLink({
                    uri: `ws://${params.domain}/${params.wsLocation}`,
                    options: {
                        reconnect: true,
                        connectionParams,
                    },
                    webSocketImpl: WebSocket,
                });

                return client.request(operation);
            };

            link = split(
                ({query, setContext: wsSetContext}) => {
                    wsSetContext(previousContext => {
                        if (
                            previousContext.graphqlContext &&
                            previousContext.graphqlContext.headers
                        ) {
                            return {
                                ...previousContext.graphqlContext,
                            };
                        }
                    });
                    const definition = getMainDefinition(query);

                    return (
                        definition.kind === "OperationDefinition" &&
                        definition.operation === "subscription"
                    );
                },
                wsLink,
                httpLink,
                remoteError,
            );
        } else {
            link = setContext((request, previousContext) => {
                if (
                    previousContext.graphqlContext &&
                    previousContext.graphqlContext.headers
                ) {
                    return {
                        ...previousContext.graphqlContext,
                    };
                }
                return;
            }).concat(remoteError).concat(httpLink);
        }

        const schema = await introspectSchema(httpLink);

        return makeRemoteExecutableSchema({
            schema,
            link,
        });
    } catch (err) {
        console.log(err);
        throw new Warning(`Failed to create the remote. ${params.domain}`);
    }
};
