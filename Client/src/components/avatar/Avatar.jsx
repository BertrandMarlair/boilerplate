import React, {useEffect} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import avatarStyle from "./AvatarStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import {NO_AVATAR_URL, PUBLIC_URL, ENDPOINT} from "../../core/constants";
import {stringToColour} from "../../core/utils/misc";
import {useTheme} from "@material-ui/core";
import {useLazyQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import Loading from "../loading/Loading";
import Error from "../error/Error";
import {getLocalstorage} from "../../core/localstorage/localStorage";
import {useHistory} from "react-router-dom";

const RegularAvatar = ({...props}) => {
    const {
        id,
        classes,
        className,
        centered,
        whiteBorder,
        noMargin,
        user,
        disableTooltip = false,
        placement = "top",
        size,
        avatar,
        name,
        negMargin,
        email,
        disableLink,
        new: newFile,
        ...rest
    } = props;

    const theme = useTheme();
    const history = useHistory();

    const key = `nocache=${getLocalstorage("key")}`;

    const [getUserById, {data, loading, error}] = useLazyQuery(GET_USER_BY_ID);
    const [getUserByEmail, {data: dataEmail, loading: loadingEmail, error: errorEmail}] = useLazyQuery(
        GET_USER_BY_EMAIL,
    );

    const containerClasses = classNames({
        [classes.container]: true,
        [classes.noMargin]: noMargin,
        [classes.negMargin]: negMargin,
    });

    const avatarClasses = classNames({
        [className]: className,
        [classes.noMargin]: noMargin,
        [classes.centered]: centered,
        [classes[size]]: size,
        [classes.whiteBorder]: whiteBorder,
    });

    const tooltipClasses = classNames({
        [className]: className,
    });

    useEffect(() => {
        if (id) {
            getUserById({variables: {id}});
        }
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        if (email) {
            getUserByEmail({variables: {email}});
        }
        // eslint-disable-next-line
    }, [email]);

    const getData = () => {
        if (data && data.getUserById) {
            return data.getUserById;
        } else if (dataEmail && dataEmail.getUserByEmail) {
            return dataEmail.getUserByEmail;
        }
        return user;
    };

    const getAvatar = () => {
        const usr = getData();

        if (usr && usr.avatar) {
            if (usr.avatar.includes("s3bucket")) {
                return (
                    <Avatar
                        onClick={() => !disableLink && history.push(`/profile/main/${usr.id}`)}
                        alt="custom avatar"
                        {...rest}
                        className={avatarClasses}
                        src={`${ENDPOINT}${usr.avatar}${!newFile ? `?${key}` : ""}`}
                    />
                );
            }
            return (
                <Avatar
                    onClick={() => !disableLink && history.push(`/profile/main/${usr.id}`)}
                    alt="custom avatar"
                    {...rest}
                    className={avatarClasses}
                    src={`${usr.avatar}${!newFile ? `?${key}` : ""}`}
                />
            );
        } else if (usr && usr.name) {
            const stringColor = stringToColour(usr.name);
            const backgroundColor = `hsl(${stringColor}, 63%, 50%)`;

            const color = theme.palette.white.main;

            return (
                <Avatar
                    alt="custom avatar"
                    onClick={() => !disableLink && history.push(`/profile/main/${usr.id}`)}
                    className={avatarClasses}
                    {...rest}
                    style={{backgroundColor, color}}>
                    {usr.name[0].toUpperCase()}
                </Avatar>
            );
        } else if (avatar) {
            return (
                <Avatar
                    alt="custom avatar"
                    {...rest}
                    className={avatarClasses}
                    src={`${avatar}?${new Date().getTime()}`}
                />
            );
        } else if (name) {
            const stringColor = stringToColour(name);
            const backgroundColor = `hsl(${stringColor}, 63%, 50%)`;
            const color = theme.palette.white.main;

            return (
                <Avatar alt="custom avatar" {...rest} className={avatarClasses} style={{backgroundColor, color}}>
                    {name[0].toUpperCase()}
                </Avatar>
            );
        }

        return <Avatar alt="custom avatar" {...rest} className={avatarClasses} src={`${PUBLIC_URL}${NO_AVATAR_URL}`} />;
    };

    const getTitle = () => {
        const usr = getData();

        if (usr?.name) {
            return `${usr.name}`;
        } else if (name) {
            return name;
        }

        return null;
    };

    const title = getTitle();

    if (loading || loadingEmail) {
        return <Loading small />;
    }

    if (error || errorEmail) {
        return <Error errorMessage={error || errorEmail} />;
    }

    return !disableTooltip && title ? (
        <Tooltip className={tooltipClasses} title={title} placement={placement}>
            <div className={containerClasses}>{getAvatar()}</div>
        </Tooltip>
    ) : (
        <div className={containerClasses}>{getAvatar()}</div>
    );
};

RegularAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object,
    avatar: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
    centered: PropTypes.string,
    new: PropTypes.bool,
    placement: PropTypes.oneOf([
        "bottom-end",
        "bottom-start",
        "bottom",
        "left-end",
        "left-start",
        "left",
        "right-end",
        "right-start",
        "right",
        "top-end",
        "top-start",
        "top",
    ]),
    size: PropTypes.oneOf(["bigger", "big", "small", "smaller"]),
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    disableTooltip: PropTypes.bool,
    whiteBorder: PropTypes.bool,
    negMargin: PropTypes.bool,
    noMargin: PropTypes.bool,
    disableLink: PropTypes.bool,
};

export default withStyles(avatarStyle)(RegularAvatar);

const GET_USER_BY_ID = gql`
    query getUserById($id: ID!) {
        getUserById(id: $id) {
            _id
            name
        }
    }
`;

const GET_USER_BY_EMAIL = gql`
    query getUserByEmail($email: Email!) {
        getUserByEmail(email: $email) {
            _id
            name
        }
    }
`;
