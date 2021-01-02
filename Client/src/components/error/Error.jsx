import React, {Fragment} from "react";
import {withStyles} from "@material-ui/core";
import ErrorStyle from "./ErrorStyle";
import Text from "../typography/Text";
import {useTranslation} from "react-i18next";
import classNames from "classnames";

const CustomError = ({errorMessage, noPadding, classes, ...rest}) => {
    const {t} = useTranslation();

    const errorClasses = classNames({
        [classes.container]: !noPadding,
    });

    if (errorMessage) {
        if (errorMessage.graphQLErrors && errorMessage.graphQLErrors.length > 0) {
            const graphError = errorMessage.graphQLErrors;

            if (graphError[0]) {
                if (graphError[0].message) {
                    return (
                        <div className={errorClasses} {...rest}>
                            <Text color="error">
                                {t(graphError[0].message.replace("AuthenticationError: ", "").replace("Error: ", ""))}
                            </Text>
                        </div>
                    );
                }
                return (
                    <div className={errorClasses} {...rest}>
                        <Text color="error">{t(JSON.stringify(graphError[0]))}</Text>
                    </div>
                );
            }
            return (
                <div className={errorClasses} {...rest}>
                    <Text color="error">{t(JSON.stringify(graphError))}</Text>
                </div>
            );
        } else if (errorMessage.message) {
            if (errorMessage.message instanceof Array) {
                return (
                    <div className={errorClasses} {...rest}>
                        <Text color="error">{t(errorMessage.message[0].message)}</Text>
                    </div>
                );
            }
            return (
                <div className={errorClasses} {...rest}>
                    <Text color="error">{t(errorMessage).message}</Text>
                </div>
            );
        } else if (typeof errorMessage === "string") {
            return (
                <div className={errorClasses} {...rest}>
                    <Text color="error">{t(errorMessage)}</Text>
                </div>
            );
        }
    }

    return <Fragment></Fragment>;
};

export default withStyles(ErrorStyle)(CustomError);
