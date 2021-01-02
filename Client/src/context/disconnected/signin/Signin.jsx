import React, {useState, useEffect, Fragment} from "react";
import gql from "graphql-tag";
import style from "./SigninStyle";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {withStyles} from "@material-ui/styles";
import {useMutation} from "@apollo/react-hooks";
import Card from "../../../components/card/Card";
import Input from "../../../components/input/Input";
import Error from "../../../components/error/Error";
import notify from "../../../core/snackbar/snackbar";
import Button from "../../../components/button/Button";
import Text from "../../../components/typography/Text";
import Title from "../../../components/typography/Title";
import SmallTitle from "../../../components/typography/SmallTitle";
import Select from "../../../components/select/Select";

const Signin = ({classes, history}) => {
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(null);
    const [type, setType] = useState("");
    const [errorType, setErrorType] = useState(null);
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
    const [nameSended, setNameSended] = useState(false);

    const {t} = useTranslation();

    const [createUserMutation, {data, error, loading}] = useMutation(REGISTER_WITH_BASIC);

    useEffect(() => {
        if (data?.signin?._id) {
            notify(t("connect.signin.success.signin"), {
                variant: "success",
            });
            setNameSended(true);
        }
    }, [data, history, t]);

    const createUser = (e) => {
        e.preventDefault();
        let validation = true;

        if (name.length < 2) {
            setErrorName("connect.register.errors.invalidName");
            validation = false;
        } else {
            setErrorName("");
        }
        if (!type) {
            setErrorType("connect.register.errors.invalidType");
            validation = false;
        } else {
            setErrorType("");
        }
        if (password.length < 5) {
            setErrorPassword("connect.register.errors.invalidPassword");
            validation = false;
        } else {
            setErrorPassword("");
        }
        if (confirmPassword.length < 5) {
            setErrorConfirmPassword("connect.register.errors.invalidConfirmPasswordShort");
            validation = false;
        } else {
            setErrorConfirmPassword("");
        }
        if (confirmPassword !== password) {
            setErrorConfirmPassword("connect.register.errors.invalidConfirmPassword");
            validation = false;
        } else {
            setErrorConfirmPassword("");
        }

        if (validation) {
            const input = {
                name,
                type,
                password,
                passwordConfirmation: confirmPassword,
            };

            createUserMutation({variables: {...input}});
        }
    };

    const options = [
        {
            value: "user",
            label: "User",
        },
        {
            value: "device",
            label: "Device",
        },
    ];

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.cardItemLeft}>
                    <div className={classes.cardContentPass}>
                        <div className={classes.title}>
                            <Title normal smaller centered color="white">
                                {t("connect.signin.alreadyAccountTitle")}
                            </Title>
                        </div>
                        <div className={classes.description}>
                            <Text centered color="white" noWrap>
                                {t("connect.signin.alreadyAccountDescription")}
                            </Text>
                        </div>
                        <NavLink to={"/connect/login"}>
                            <Button color="white">{t("connect.signin.login")}</Button>
                        </NavLink>
                    </div>
                </div>
                <div className={classes.cardItemRight}>
                    <div className={classes.cardContent}>
                        {!nameSended ? (
                            <Fragment>
                                <div className={classes.title}>
                                    <Title normal centered>
                                        {t("connect.signin.title")}
                                    </Title>
                                </div>
                                <div className={classes.description}>
                                    <Text noWrap centered>
                                        {t("connect.signin.description")}
                                    </Text>
                                </div>
                                <form className={classes.form} onSubmit={(e) => createUser(e)}>
                                    <div className={classes.input}>
                                        <SmallTitle bold className={classes.label}>
                                            {t("connect.signin.nameInputTitle")}
                                        </SmallTitle>
                                        <Input
                                            autoFocus
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder={t("connect.signin.nameInputLabel")}
                                            autoComplete={"name"}
                                            type={"text"}
                                            helperText={t(errorName)}
                                            error={!!errorName}
                                        />
                                    </div>
                                    <div className={classes.input}>
                                        <div className={classes.inputType}>
                                            <SmallTitle bold className={classes.label}>
                                                {t("connect.signin.typeInputTitle")}
                                            </SmallTitle>
                                            <Select
                                                placeholder={t("connect.signin.typeInputLabel")}
                                                options={options}
                                                error={!!errorType}
                                                isClearable={false}
                                                onChange={(e) => setType(e.value)}
                                                isSearchable={false}
                                                inputValue=""
                                            />
                                        </div>
                                    </div>
                                    <div className={classes.input}>
                                        <SmallTitle bold className={classes.label}>
                                            {t("connect.signin.passwordInputTitle")}
                                        </SmallTitle>
                                        <Input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder={t("connect.signin.passwordInputLabel")}
                                            autoComplete={"current-password"}
                                            type={"password"}
                                            helperText={t(errorPassword)}
                                            error={!!errorPassword}
                                        />
                                    </div>
                                    <div className={classes.input}>
                                        <SmallTitle bold className={classes.label}>
                                            {t("connect.signin.confirmPasswordInputTitle")}
                                        </SmallTitle>
                                        <Input
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder={t("connect.signin.confirmPasswordInputLabel")}
                                            autoComplete={"current-password"}
                                            type={"password"}
                                            helperText={t(errorConfirmPassword)}
                                            error={!!errorConfirmPassword}
                                        />
                                    </div>
                                    <Error errorMessage={error} />
                                    <div className={classes.formFooter}>
                                        <Button noMargin fullWidth size="lg" type="submit" loading={loading}>
                                            {t("connect.signin.submit")}
                                        </Button>
                                    </div>
                                </form>
                            </Fragment>
                        ) : (
                            <div>
                                <Title normal centered color="success">
                                    {t("connect.signin.name.title")}
                                </Title>
                                <SmallTitle noWrap centered>
                                    {t("connect.signin.name.description")}
                                </SmallTitle>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default withStyles(style)(Signin);

const REGISTER_WITH_BASIC = gql`
    mutation signin($name: String!, $type: TypeEnum!, $password: String!, $passwordConfirmation: String!) {
        signin(user: {name: $name, type: $type, password: $password, passwordConfirmation: $passwordConfirmation}) {
            _id
        }
    }
`;
