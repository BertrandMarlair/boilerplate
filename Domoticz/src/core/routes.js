import healhCheck from "./controllers/healthCheck";

const routes = [
    {path: "/health", type: "get", controller: healhCheck},
];

export default routes;
