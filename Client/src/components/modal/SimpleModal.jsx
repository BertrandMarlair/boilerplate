import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import {useTheme, IconButton, useMediaQuery} from "@material-ui/core";
import classNames from "classnames";
import style from "./SimpleModalStyle";
import Dialog from "@material-ui/core/Dialog";
import Icon from "../icon/Icon";

const SimpleModal = ({classes, className, children, open, onClose, fullWidth, maxWidth}) => {
    const modalClasses = classNames({
        [className]: className,
        [classes[maxWidth]]: maxWidth,
    });

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

    useEffect(() => {
        setTimeout(() => {
            const list = document.querySelectorAll('div[tabindex*="-1"]');

            for (let element of list) {
                element.removeAttribute("tabindex");
            }
        }, 100);
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={fullScreen || fullWidth}
            className={modalClasses}
            maxWidth={maxWidth}
            disableBackdropClick>
            <div className={classes.paper}>
                {onClose && (
                    <IconButton className={classes.iconButton} aria-label="Delete" onClick={onClose}>
                        <Icon size={16} color={theme.palette.text.contrasted}>
                            Close
                        </Icon>
                    </IconButton>
                )}
                {children}
            </div>
        </Dialog>
    );
};

SimpleModal.propTypes = {
    open: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool,
    smaller: PropTypes.bool,
    children: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
};

export default withStyles(style)(SimpleModal);
