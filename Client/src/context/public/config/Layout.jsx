import React, {Fragment} from "react";
import Headers from "../../../components/header/Header";

const Layout = (props) => (
    <Fragment>
        <Headers />
        {props.children}
    </Fragment>
);

export default Layout;
