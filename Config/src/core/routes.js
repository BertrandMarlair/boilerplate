import getConfig from "../controller/getConfig";
import healthCheck from "../controller/healthCheck";

const routes = [
    {path: "/config", type: "post", controller: getConfig},
    {path: "/health", type: "get", controller: healthCheck},
];

export default routes;
