import React from "react";

import {withStyles} from "@material-ui/core";

import style from "./LoadingStyle";
import Loading from "./Loading";
import Skeleton from "@material-ui/lab/Skeleton";
import {useSelector} from "react-redux";
import {widthSideBarOpnend, widthSideBarClosed, mediaQuerySizeXs} from "../../core/style/constant";
import {useMediaQuery} from "react-responsive";

const LoaderLayout = ({classes}) => {
    const layoutGlobal = useSelector((state) => state.layout);
    const {isSidebarOpened} = layoutGlobal;
    const isMobile = useMediaQuery({
        query: `(max-width: ${mediaQuerySizeXs}px)`,
    });

    const getSideBarSize = () => {
        if (isSidebarOpened) {
            return widthSideBarOpnend;
        }
        return widthSideBarClosed;
    };

    return (
        <div className={classes.layout}>
            <nav className={classes.nav}>
                <div className={classes.options}>
                    <div className={classes.optionItem}>
                        <Skeleton variant="rect" width={82} height={32} className={classes.skeleton} />
                    </div>
                    <Skeleton variant="text" width={100} height={32} className={classes.skeleton} />
                </div>
                <div className={classes.sideOptions}>
                    <div className={classes.options}>
                        <div className={classes.optionItem}>
                            <Skeleton variant="rect" width={40} height={32} className={classes.skeleton} />
                        </div>
                    </div>
                    <div className={classes.options}>
                        <div className={classes.optionItem}>
                            <Skeleton variant="rect" width={40} height={32} className={classes.skeleton} />
                        </div>
                    </div>
                    <div className={classes.options}>
                        <div className={classes.optionItem}>
                            <Skeleton variant="rect" width={40} height={32} className={classes.skeleton} />
                        </div>
                    </div>
                    <div className={classes.options}>
                        <div className={classes.optionItem}>
                            <Skeleton variant="rect" width={40} height={32} className={classes.skeleton} />
                        </div>
                    </div>
                    <div className={classes.options}>
                        <div className={classes.optionItem}>
                            <Skeleton variant="rect" width={68} height={32} className={classes.skeleton} />
                        </div>
                    </div>
                </div>
            </nav>
            {!isMobile && <div className={classes.sideBar} style={{width: getSideBarSize()}} />}
            <div className={classes.body}>
                <Loading absolute />
            </div>
        </div>
    );
};

export default withStyles(style)(LoaderLayout);
