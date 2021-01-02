import React from "react";
import {withStyles} from "@material-ui/core";
import style from "./LoadingStyle";

const LoaderScreen = ({classes}) => {
    return (
        <div className={classes.loaderScreen}>
            <div className={classes.loaderImage}>
                <img alt="logo" src="/assets/logos/smart.png" />
            </div>
        </div>
    );
};

export default withStyles(style)(LoaderScreen);
