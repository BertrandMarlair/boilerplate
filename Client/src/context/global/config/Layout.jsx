import React, {Fragment, Suspense} from "react";
import {useSelector} from "react-redux";
import MediaQuery from "react-responsive";

import {withStyles} from "@material-ui/core";
import style from "./Style";

import SideBar from "../../../components/sideBar/SideBar";
import Header from "../../../components/header/Header";

import {mediaQuerySizeXs, widthSideBarClosed, widthSideBarOpnend} from "../../../core/style/constant";
import useMenu from "../config/useMenu";
import LoaderLayout from "../../../components/loading/LoaderLayout";

const Layout = ({children, classes}) => {
    const layout = useSelector((state) => state.layout);
    const {isSidebarOpened} = layout;
    const menu = useMenu();

    return (
        <Fragment>
            <Header />
            <SideBar menu={menu} />
            <Suspense fallback={<LoaderLayout />}>
                <MediaQuery query={`(min-width: ${mediaQuerySizeXs}px)`}>
                    <div
                        className={classes.drawer}
                        style={{
                            paddingLeft: isSidebarOpened ? widthSideBarOpnend : widthSideBarClosed,
                        }}>
                        <div className={classes.drawerWrapper} id="dashboard">
                            {children}
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery query={`(max-width: ${mediaQuerySizeXs}px)`}>
                    <div className={classes.drawerSmall}>
                        <div className={classes.drawerWrapper} id="dashboard">
                            {children}
                        </div>
                    </div>
                </MediaQuery>
            </Suspense>
        </Fragment>
    );
};

export default withStyles(style)(Layout);
