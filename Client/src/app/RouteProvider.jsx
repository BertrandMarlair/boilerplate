import React, {Fragment, useState, useEffect} from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom";

import LayoutProvider from "./LayoutProvider";
import NoInternetConnection from "../components/noInternetConnection/NoInternetConnection";
import {useLazyQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {useDispatch} from "react-redux";
import LoaderScreen from "../components/loading/LoaderScreen";
import {useHistory} from "react-router-dom";

const RouteProvider = (props) => {
    const dispatch = useDispatch();
    const logout = () => dispatch({type: "LOGOUT"});
    const [loaded, setLoaded] = useState(false);
    const [checkAuthUser, {data, loading, error}] = useLazyQuery(CHECK_USER);

    const history = useHistory();

    const layoutContainerTarget = window.location.pathname.replace("/", "").split("/")[0];

    useEffect(() => {
        if (!["connect"].includes(layoutContainerTarget)) {
            checkAuthUser();
        }
    }, [layoutContainerTarget]);

    useEffect(() => {
        if (data?.checkAuthUser?._id) {
            setLoaded(true);
        }
        if (error) {
            logout();
            window.location = "/connect/login";
        }
    }, [data, error, history]);

    return (
        <Fragment>
            {loading && <LoaderScreen />}
            {!loaded && <LoaderScreen />}
            <NoInternetConnection />
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <LayoutProvider {...props} />
                </Switch>
            </Router>
        </Fragment>
    );
};

export default RouteProvider;

const CHECK_USER = gql`
    query checkAuthUser {
        checkAuthUser {
            _id
        }
    }
`;
