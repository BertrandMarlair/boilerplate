import {lazy} from "react";

const Application = lazy(() => import("../application/Application"));

export const defaultRoute = "/app/application";
export const name = "App";
export const slug = "app";

const dashboardRoutes = [
    {
        path: "/app/application",
        name: "Application",
        component: Application,
        exact: true,
        breadCrumbs: [{name: "Application", url: "/app/application"}],
    },
];

export default dashboardRoutes;
