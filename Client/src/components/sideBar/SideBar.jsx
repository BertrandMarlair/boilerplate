import React, {useMemo} from "react";
import {withStyles} from "@material-ui/styles";
import style from "./SideBarStyle";
import PropTypes from "prop-types";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {widthSideBarClosed, widthSideBarOpnend, mediaQuerySizeXs} from "../../core/style/constant";
import Icon from "../icon/Icon";
import SmallTitle from "../typography/SmallTitle";
import {NavLink, useRouteMatch} from "react-router-dom";
import {useTheme, IconButton, Badge, Tooltip} from "@material-ui/core";
import {useMediaQuery} from "react-responsive";

const SideBarProvider = ({menu, classes}) => {
    const match = useRouteMatch();
    const theme = useTheme();

    const Provider = useMemo(() => {
        return <SideBar menu={menu} classes={classes} match={match} />;
        // eslint-disable-next-line
    }, [menu, match, theme]);

    return Provider;
};

const SideBar = ({menu, classes, match}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const {t} = useTranslation();
    const isMobile = useMediaQuery({
        query: `(max-width: ${mediaQuerySizeXs}px)`,
    });

    const layoutGlobal = useSelector((state) => state.layout);
    const {isSidebarOpened} = layoutGlobal;

    const toggleMenu = () => dispatch({type: "Layout/TOGGLE_SIDEBAR"});

    const getSideBarSize = () => {
        if (isSidebarOpened) {
            return widthSideBarOpnend;
        } else if (isMobile) {
            return 0;
        }

        return widthSideBarClosed;
    };

    const HtmlTooltip = withStyles(() => ({
        tooltip: {
            maxWidth: 220,
            margin: "0px 5px",
            background: theme.palette.background.paper,
            text: theme.palette.text.primary,
            boxShadow: "0px 12px 28px rgba(0, 9, 128, 0.1)",
            borderRadius: 4,
        },
    }))(Tooltip);

    return (
        <div className={classes.root} style={{width: getSideBarSize()}}>
            <NavLink className={classes.head} to={menu.head.link}>
                <SmallTitle noWrap>{menu.head.title}</SmallTitle>
            </NavLink>
            {menu.subHead && (
                <NavLink className={classes.subHead} to={menu.subHead.link}>
                    <div className={classes.menuSubItemId}>
                        <SmallTitle noWrap>{menu.subHead.id}</SmallTitle>
                    </div>
                    <div style={{opacity: isSidebarOpened ? 1 : 0}} className={classes.menuItemText}>
                        <SmallTitle noWrap>{menu.subHead.title}</SmallTitle>
                    </div>
                </NavLink>
            )}
            <div className={classes.content}>
                {menu.items.map((item, i) => {
                    const currentUrl = match.url === item.link || window.location.pathname === item.link;

                    const StyledBadge = withStyles(() => ({
                        badge: {
                            right: 10,
                            border: `2px solid ${theme.palette.background.paper}`,
                            padding: "0 4px",
                            background: theme.palette.background.light,
                            color: currentUrl ? theme.palette.primary.light : theme.palette.text.secondary,
                        },
                    }))(Badge);

                    return (
                        <NavLink
                            to={item.link}
                            key={`sideBarItem/${i}`}
                            className={classes.menuItem}
                            onClick={() => isMobile && toggleMenu()}
                            style={{
                                background: currentUrl ? `${theme.palette.primary.light}10` : "transparent",
                            }}>
                            {!isSidebarOpened ? (
                                <HtmlTooltip
                                    placement="right"
                                    title={
                                        <div className={classes.tooltip}>
                                            <SmallTitle>{t(item.name)}</SmallTitle>
                                        </div>
                                    }>
                                    <div
                                        className={classes.icon}
                                        style={{
                                            borderLeft: currentUrl
                                                ? `4px solid ${theme.palette.primary.main}`
                                                : "4px solid transparent",
                                        }}>
                                        <Icon size={18} color={currentUrl && theme.palette.primary.light}>
                                            {item.icon}
                                        </Icon>
                                    </div>
                                </HtmlTooltip>
                            ) : (
                                <div
                                    className={classes.icon}
                                    style={{
                                        borderLeft: currentUrl
                                            ? `4px solid ${theme.palette.primary.main}`
                                            : "4px solid transparent",
                                    }}>
                                    <Icon size={18} color={currentUrl && theme.palette.primary.light}>
                                        {item.icon}
                                    </Icon>
                                </div>
                            )}
                            <div style={{opacity: isSidebarOpened ? 1 : 0}} className={classes.menuItemText}>
                                <SmallTitle bold={currentUrl} color={currentUrl ? "contrasted" : null}>
                                    {t(item.name)}
                                </SmallTitle>
                                {item.badges >= 0 && <StyledBadge badgeContent={item.badges} color="secondary" />}
                            </div>
                        </NavLink>
                    );
                })}
            </div>
            <div className={classes.footer} onClick={() => toggleMenu()}>
                <div
                    className={classes.menuItem}
                    style={{
                        background: `${theme.palette.primary.light}10`,
                    }}>
                    <div className={classes.collapseIcon}>
                        <IconButton>
                            <Icon size={14} seo>
                                {isSidebarOpened ? "Left" : "VerticalLeft"}
                            </Icon>
                        </IconButton>
                    </div>
                    <div style={{opacity: isSidebarOpened ? 1 : 0}} className={classes.menuItemText}>
                        <SmallTitle>{t("sidebar.collapse")}</SmallTitle>
                    </div>
                </div>
            </div>
        </div>
    );
};

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
    menu: PropTypes.object.isRequired,
};

export default withStyles(style)(SideBarProvider);
