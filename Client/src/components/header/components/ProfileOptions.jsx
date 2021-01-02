import React, {Fragment, useEffect, useCallback} from "react";
import Popper from "../../popper/Popper";
import {MenuList, MenuItem} from "@material-ui/core";
import SmallTitle from "../../typography/SmallTitle";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";
import Avatar from "../../avatar/Avatar";
import Icon from "../../icon/Icon";
import gql from "graphql-tag";
import {withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {useQuery} from "react-apollo";
import {useTheme} from "@material-ui/styles";
import {LOGOUT, UPDATE_USER_INFO} from "../../../core/reducers/connectConfig";
import {useState} from "react";

const ProfileOptions = (props) => {
    const {classes, handleCloseAvatar, handleClickAvatar, anchorElAvatar, history} = props;
    const [user, setUser] = useState({});
    const [updated, setUpdated] = useState(false);
    const {data, error} = useQuery(GET_CURRENT_USER);

    const dispatch = useDispatch();
    const theme = useTheme();
    const {t} = useTranslation();
    const logout = () => dispatch({type: LOGOUT});

    const updateUserInfo = useCallback(
        (payload) => {
            dispatch({type: UPDATE_USER_INFO, payload});
        },
        [dispatch],
    );

    const logoutProfile = () => {
        logout();
        history.push("/connect/login");
    };

    useEffect(() => {
        if (data && data.getCurrentUser) {
            setUser(data.getCurrentUser);
            if (!updated) {
                setUpdated(true);
                updateUserInfo(data.getCurrentUser);
            }
        }
    }, [data, updateUserInfo, updated]);

    if (!updated) {
        return <Loading small />;
    }

    return (
        <Fragment>
            <div className={classes.options}>
                <Error errorMessage={error} />
                <div className={classes.optionItemSmall} onClick={handleClickAvatar} data-test-id="header-icon-profile">
                    <Avatar disableLink disableTooltip size="small" user={user} />
                    <Icon color={theme.palette.primary.contrastText}>{!anchorElAvatar ? "Down" : "Up"}</Icon>
                </div>
            </div>
            <Popper anchorEl={anchorElAvatar} handleClose={handleCloseAvatar}>
                <MenuList>
                    <MenuItem onClick={() => logoutProfile()} data-test-id="header-menuItem-logout">
                        <SmallTitle light>{t("header.avatar.logout")}</SmallTitle>
                    </MenuItem>
                </MenuList>
            </Popper>
        </Fragment>
    );
};

export default withRouter(ProfileOptions);

const GET_CURRENT_USER = gql`
    query getCurrentUser {
        getCurrentUser {
            _id
            name
        }
    }
`;
