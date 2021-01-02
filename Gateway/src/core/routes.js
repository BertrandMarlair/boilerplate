import healhCheck from "./controllers/healthCheck";

const routes = [
    {path: "/health", controller: healhCheck, type: "get"},
];

export default routes;
