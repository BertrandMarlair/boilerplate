import healhCheck from "./controllers/healthCheck";

const routes = [
    {path: "/health", controller: healhCheck, type: "post"},
];

export default routes;
