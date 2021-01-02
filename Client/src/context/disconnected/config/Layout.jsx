import React, {Fragment, Suspense} from "react";
import Header from "../../../components/header/Header";
import LoaderLayout from "../../../components/loading/LoaderLayout";

const Layout = ({children}) => (
    <Fragment>
        <Header />
        <Suspense fallback={<LoaderLayout />}>{children}</Suspense>
    </Fragment>
);

export default Layout;
