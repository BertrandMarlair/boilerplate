import {getRemoteSchema} from "./remote";
import {createServer} from "./apollo-server";
import {checkConnectionState} from "./connectionState";
import {NODE_ENV} from "./constants";

export const getSchemas = async (app, httpServer, endpoints) => {
    const checkedEndpointConnection = await Promise.all(
        endpoints.map(ep => checkConnectionState(ep)),
    );
    const allSchemas = await Promise.all(
        checkedEndpointConnection
            .filter(ep => ep.connected)
            .map(ep => getRemoteSchema(ep)),
    );
    const endpoint = createServer(
        NODE_ENV === "development" && true,
        allSchemas,
    );

    createServer(true, allSchemas).applyMiddleware({app, path: "/explore"});

    endpoint.installSubscriptionHandlers(httpServer);
    endpoint.applyMiddleware({app, path: "/"});
    checkedEndpointConnection
        .filter(ep => !ep.connected)
        .map(ep => console.log("💣", `Fail to connect to ${ep.domain}`));
};
