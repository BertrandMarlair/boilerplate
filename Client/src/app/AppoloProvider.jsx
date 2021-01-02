import React, {useEffect} from "react";
import {ApolloClient, InMemoryCache} from "apollo-boost";
import {ApolloProvider as ApolloProviderApollo} from "react-apollo";
import {ApolloProvider} from "@apollo/react-hooks";
import {useDispatch} from "react-redux";
import {ApolloLink, split} from "apollo-link";
import {setContext} from "apollo-link-context";
import {createHttpLink} from "apollo-link-http";
import {getMainDefinition} from "apollo-utilities";
import {WebSocketLink} from "apollo-link-ws";
import {ACCESS_TOKEN_NAME, ENDPOINT_HTTP, ENDPOINT_WS, ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN} from "../core/constants";
import RouteProvider from "./RouteProvider";
import {fetchAccessToken, handleResponse, isTokenExpired} from "../core/apollo/refreshToken";
import {getLocalstorage} from "../core/localstorage/localStorage";
import notify from "../core/snackbar/snackbar";
import {TokenRefreshLink} from "apollo-link-token-refresh";
import {onError} from "apollo-link-error";

const AppoloProvider = ({connected}) => {
    useEffect(() => {
        if (isTokenExpired(REFRESH_EXPIRES_IN)) {
            logout();
        }
    }, []);

    const httpLink = createHttpLink({uri: ENDPOINT_HTTP});

    const middlewareLink = setContext(() => ({
        headers: connected && {
            [ACCESS_TOKEN_NAME]: getLocalstorage(ACCESS_TOKEN_NAME),
        },
    }));

    const dispatch = useDispatch();
    const logout = () => dispatch({type: "LOGOUT"});

    const afterwareLink = new ApolloLink((operation, forward) => {
        return forward(operation).map((response) => {
            if (isTokenExpired(REFRESH_EXPIRES_IN)) {
                logout();
            }
            return response;
        });
    });

    const httpLinkAuth = afterwareLink.concat(middlewareLink.concat(httpLink));

    const wsLink = new WebSocketLink({
        uri: ENDPOINT_WS,
        options: {
            reconnect: true,
            lazy: true,
            connectionParams: {
                token: getLocalstorage(ACCESS_TOKEN_NAME),
            },
        },
    });

    const tokenRefreshLink = new TokenRefreshLink({
        accessTokenField: ACCESS_TOKEN_NAME,
        isTokenValidOrUndefined: () => !isTokenExpired(ACCESS_EXPIRES_IN),
        fetchAccessToken,
        handleResponse: (operation, accessTokenField) => handleResponse(operation, accessTokenField, logout),
        handleError: (err) => {
            if (
                err.message.toLowerCase().includes("jwt") ||
                err.message.toLowerCase().includes("signature") ||
                err.message.toLowerCase().includes("expired") ||
                err.message.toLowerCase().includes("token")
            ) {
                console.warn("Invalid JWT Token. Cleaning…");
                if (window.location.pathname !== "/") {
                    console.warn("…and redirect.");
                    logout();
                }
            }
        },
    });

    const link = split(
        ({query}) => {
            const {kind, operation} = getMainDefinition(query);

            return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        httpLinkAuth,
    );

    const linkError = onError(({graphQLErrors, networkError, response}) => {
        if (graphQLErrors) {
            console.log(graphQLErrors);
            graphQLErrors.forEach((errors) => {
                const {message, locations, path} = errors || {};

                console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
                if (message) {
                    if (
                        message.toLowerCase().includes("jwt") ||
                        message.toLowerCase().includes("signature") ||
                        message.toLowerCase().includes("expired") ||
                        message.toLowerCase().includes("token")
                    ) {
                        console.warn("Invalid JWT Token. Cleaning…");
                        logout();
                    }
                    if (response) {
                        response.errors = [{message}];
                    }
                } else {
                    notify(message ?? "Internal server error", {
                        variant: "error",
                    });
                }
            });
        }
        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
    });

    const client = new ApolloClient({
        link: ApolloLink.from([tokenRefreshLink, linkError, link]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "cache-and-network",
                errorPolicy: "all",
            },
            query: {
                fetchPolicy: "cache-and-network",
                errorPolicy: "all",
            },
            mutate: {
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            },
        },
    });

    return (
        <ApolloProviderApollo client={client}>
            <ApolloProvider client={client}>
                <RouteProvider />
            </ApolloProvider>
        </ApolloProviderApollo>
    );
};

export default AppoloProvider;
