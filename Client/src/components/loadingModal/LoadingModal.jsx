/* eslint-disable new-cap */
import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import "./LoadingModalStyle.css";
import {withStyles, useTheme} from "@material-ui/core";
import LoadingModalStyle from "./LoadingModalStyle.jsx";
import Modal from "../modal/SimpleModal";
import Title from "../typography/Title";
import SmallTitle from "../typography/SmallTitle";
import Icon from "../icon/Icon";

const LoadingModal = ({classes, forcedLoading}) => {
    const [message, setMessage] = useState("");

    const loading = useSelector((state) => state.loading);
    const {isLoading, reportName, processing} = loading;
    const theme = useTheme();

    const dispatch = useDispatch();
    const CLOSE_LOADING = () => dispatch({type: "CLOSE_LOADING"});

    const handleCloseLoading = () => {
        CLOSE_LOADING(!isLoading);
    };

    const $ = (selector) => {
        return document.querySelector(selector);
    };
    const $All = (selector) => {
        return document.querySelectorAll(selector);
    };

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => setMessage("Creating your report"), 0);
            setTimeout(() => setMessage("Provisioning resources"), 1000);
            setTimeout(() => setMessage("Creating your Excel worksheet"), 2000);
            setTimeout(() => setMessage("Finishing up"), 3000);
        } else {
            setMessage("");
        }
        // eslint-disable-next-line
    }, [isLoading]);

    useEffect(() => {
        if (processing === true) {
            setMessage("Finishing up");
            $(".portion1 .fromage").style.animation =
                "endSequence 0.1s forwards cubic-bezier(0.87, 0.02, 0.2, 0.98), fromage 1s 0.2s forwards cubic-bezier(0.87, 0.02, 0.2, 0.98)";
            $(".portion2 .fromage").style.animation =
                "endSequence 0.2s forwards cubic-bezier(0.87, 0.02, 0.2, 0.98), fromage 1s 0.2s forwards cubic-bezier(0.87, 0.02, 0.2, 0.98)";
            $(".portion3 .fromage").style.animation =
                "endSequence 0.2s forwards cubic-bezier(0.87, 0.02, 0.2, 0.98), fromage 1s 0.2s forwards cubic-bezier(0.87, 0.02, 0.2, 0.98)";
            $(".donut").style.animation =
                "donut 3s 0.2s cubic-bezier(0.21, 0.49, 0.02, 0.86), donutSlow 3.2s 3s linear infinite";
            $All(".contour").forEach((div) => {
                div.style.animation = "contour 1s 0.2s forwards cubic-bezier(0.87, 0.02, 0.2, 0.98)";
            });
            $(".circle").style.animation = "circle 0.5s 0.4s forwards linear";
            $(".statusLayout").style.animation = "hiding 0.1s forwards linear";
            setTimeout(() => setMessage("Finished"), 2000);
            setTimeout(() => handleCloseLoading(), 2500);
        }
        // eslint-disable-next-line
    }, [processing]);

    const getSucceedText = () => {
        if (processing) {
            return {
                icon: "ErrorCircle",
                iconColor: theme.palette.success.main,
                textColor: "success",
                text: "Your new report is ready",
            };
        } else if (processing === false) {
            return {
                icon: "CheckCircle",
                iconColor: theme.palette.error.main,
                textColor: "danger",
                text: "Report creation failed",
            };
        }
    };

    const text = getSucceedText();

    return (
        <div>
            <Modal
                open={isLoading || forcedLoading || false}
                onClose={handleCloseLoading}
                fullWidth
                noOverflow
                className={classes.modal}
                noPadding>
                <div className={classes.container}>
                    <div className="loadingContainer">
                        <div className={classes.donutWrapper}>
                            <div className="donut">
                                <div className="portion1 contour">
                                    <div className="fromage" />
                                </div>
                                <div className="portion2 contour">
                                    <div className="fromage" />
                                </div>
                                <div className="portion3 contour">
                                    <div className="fromage" />
                                </div>
                            </div>
                            <div className={`${classes.circle} circle`} />
                        </div>
                        <div className="textContainer">
                            <div className="statusLayout dotsAnimation">
                                {message === "Finished" ? (
                                    <Title>{message}</Title>
                                ) : (
                                    <Title>
                                        {message}
                                        <span>.</span>
                                        <span>.</span>
                                        <span>.</span>
                                    </Title>
                                )}
                            </div>
                            <div className="reportLayout">
                                <SmallTitle light>{reportName}</SmallTitle>
                            </div>
                            <div className="readyLayout">
                                {text && (
                                    <div className="readyWrap">
                                        <Icon className="iconLoading">{text.icon}</Icon>
                                        <SmallTitle color={text.textColor}>{text.text}</SmallTitle>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={classes.sideContainer}>
                        <img
                            className={classes.imgSide}
                            src="/assets/illustrations/report_creation.svg"
                            alt="report creation"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default withStyles(LoadingModalStyle)(LoadingModal);
