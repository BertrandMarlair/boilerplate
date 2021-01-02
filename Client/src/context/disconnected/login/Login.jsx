import React, {useState, useEffect, useCallback} from "react";
import gql from "graphql-tag";
import style from "./LoginStyle";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {withStyles} from "@material-ui/styles";
import {useMutation} from "@apollo/react-hooks";

import Card from "../../../components/card/Card";
import Error from "../../../components/error/Error";
import Input from "../../../components/input/Input";
import notify from "../../../core/snackbar/snackbar";
import Button from "../../../components/button/Button";
import Text from "../../../components/typography/Text";
import Title from "../../../components/typography/Title";
import SmallTitle from "../../../components/typography/SmallTitle";
import {setLocalstorage} from "../../../core/localstorage/localStorage";
import {decode} from "jsonwebtoken";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME, ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN} from "../../../core/constants";

const Login = ({classes, history}) => {
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(null);
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(null);
    const [errors, setErrors] = useState(null);

    const {t} = useTranslation();

    const dispatch = useDispatch();
    const connect = useCallback(
        (user) => {
            dispatch({type: "CONNECTED", payload: user});
        },
        [dispatch],
    );

    const [loginUserMutation, {data, error, loading}] = useMutation(LOGIN_WITH_BASIC);

    useEffect(() => {
        if (data?.login?.accessToken) {
            const accessTokenDecrypted = decode(data.login.accessToken);
            const refreshTokenDecrypted = decode(data.login.refreshToken);

            notify(t("connect.login.success.connect"), {
                variant: "success",
            });
            setLocalstorage(ACCESS_TOKEN_NAME, `Bearer ${data.login.accessToken}`);
            setLocalstorage(ACCESS_EXPIRES_IN, accessTokenDecrypted.exp);
            setLocalstorage(REFRESH_TOKEN_NAME, `Bearer ${data.login.refreshToken}`);
            setLocalstorage(REFRESH_EXPIRES_IN, refreshTokenDecrypted.exp);
            connect(data.login);
        }
        if (error) {
            setErrors("connect.login.errors.failLogin");
        }
    }, [data, history, t, connect, error]);

    const loginUser = (e) => {
        e.preventDefault();
        setErrors(null);
        let validation = true;

        if (name.length < 2) {
            setErrorName("connect.signin.errors.invalidName");
            validation = false;
        } else {
            setErrorName("");
        }
        if (password.length < 5) {
            setErrorPassword("connect.signin.errors.invalidPassword");
            validation = false;
        } else {
            setErrorPassword("");
        }

        if (validation) {
            const input = {
                name,
                password,
            };

            loginUserMutation({variables: {...input}});
        }
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.cardItemLeft}>
                    <div className={classes.cardContent}>
                        <div className={classes.title}>
                            <Title normal centered>
                                {t("connect.login.title")}
                            </Title>
                        </div>
                        <div className={classes.description}>
                            <Text centered noWrap>
                                {t("connect.login.description")}
                            </Text>
                        </div>
                        <form className={classes.form} onSubmit={(e) => loginUser(e)}>
                            <div className={classes.inputName}>
                                <SmallTitle bold className={classes.label}>
                                    {t("connect.login.nameInputTitle")}
                                </SmallTitle>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={t("connect.login.nameInputLabel")}
                                    autoComplete={"name"}
                                    type={"text"}
                                    helperText={t(errorName)}
                                    error={!!errorName}
                                />
                            </div>
                            <div className={classes.inputPassword}>
                                <SmallTitle bold className={classes.label}>
                                    {t("connect.login.passwordInputTitle")}
                                </SmallTitle>
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t("connect.login.passwordInputLabel")}
                                    autoComplete={"current-password"}
                                    type={"password"}
                                    helperText={t(errorPassword)}
                                    error={!!errorPassword}
                                />
                                {<Error errorMessage={error || t(errors)} />}
                                <div className={classes.formFooter}>
                                    <Button noMargin size="lg" loading={loading} type="submit">
                                        {t("connect.login.submit")}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={classes.cardItemRight}>
                    <div className={classes.cardContentPass}>
                        <div className={classes.title}>
                            <Title normal smaller centered color="white">
                                {t("connect.login.noAccountTitle")}
                            </Title>
                        </div>
                        <div className={classes.description}>
                            <Text centered color="white">
                                {t("connect.login.noAccountDescription")}
                            </Text>
                        </div>
                        <NavLink to={"/connect/signin"}>
                            <Button color="white">{t("connect.login.signup")}</Button>
                        </NavLink>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default withStyles(style)(Login);

const LOGIN_WITH_BASIC = gql`
    mutation login($name: String!, $password: String!) {
        login(name: $name, password: $password) {
            accessToken
            refreshToken
            identity {
                _id
                name
                permission
                createdAt
                updatedAt
            }
        }
    }
`;
