import {lazy} from "react";

const Signin = lazy(() => import("../signin/Signin"));
const Login = lazy(() => import("../login/Login"));

export const defaultRoute = "/connect/login";
export const name = "Disconnected";
export const slug = "disconnected";

const connectRoutes = [
    {
        path: "/connect/signin",
        name: "Signin",
        component: Signin,
        exact: true,
        breadCrumbs: [{name: "Signin", url: "/connect/signin"}],
    },
    {
        path: "/connect/login",
        name: "Login",
        component: Login,
        exact: true,
        breadCrumbs: [{name: "Login", url: "/connect/login"}],
    },
];

export default connectRoutes;
