import React, {useState, useEffect} from "react";
import {withStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import style from "./HeaderStyle";
import Icon from "../icon/Icon";
import {useTheme, MenuList, MenuItem, Divider, IconButton} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import MediaQuery, {useMediaQuery} from "react-responsive";
import {mediaQuerySizeXs} from "../../core/style/constant";
import Popper from "../popper/Popper";
import {useTranslation} from "react-i18next";
import SmallTitle from "../typography/SmallTitle";
import Connected from "../connected/Connected";
import {EventEmitter} from "../../core/events/events";
import ProfileOptions from "./components/ProfileOptions";

const Header = ({classes}) => {
    const layout = useSelector((state) => state.darkMode);
    const {zoom} = useSelector((state) => state.theme);
    const isMobile = useMediaQuery({
        query: `(max-width: ${mediaQuerySizeXs}px)`,
    });
    const {isDarkMode} = layout;

    const theme = useTheme();
    const {t, i18n} = useTranslation();

    const [anchorElSettings, setAnchorElSettings] = useState(null);
    const [anchorElAvatar, setAnchorElAvatar] = useState(null);
    const [openedMenu, setOpenedMenu] = useState(false);

    useEffect(() => {
        if (isMobile === false) {
            setOpenedMenu(false);
        }
    }, [isMobile]);

    const handleCloseAll = () => {
        setAnchorElSettings();
        setAnchorElAvatar();
    };

    const handleClickAvatar = (event) => {
        handleCloseAll();
        setAnchorElAvatar(event.currentTarget);
    };

    const handleCloseAvatar = () => {
        setAnchorElAvatar(null);
    };

    const handleClickSettings = (event) => {
        handleCloseAll();
        setAnchorElSettings(event.currentTarget);
    };

    const handleCloseSettings = () => {
        setAnchorElSettings(null);
    };

    const handleCloseWidget = () => {
        EventEmitter.dispatch("HANDLECLOSE_WIDGET");
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleZoom = () => {
        const oldAnchorElSettings = anchorElSettings;

        setAnchorElSettings(null);
        dispatch({type: "TOGGLE_ZOOM"});

        setTimeout(() => {
            setAnchorElSettings(oldAnchorElSettings);
        }, 300);
    };

    const handleUnZoom = () => {
        const oldAnchorElSettings = anchorElSettings;

        setAnchorElSettings(null);
        dispatch({type: "TOGGLE_UN_ZOOM"});

        setTimeout(() => {
            setAnchorElSettings(oldAnchorElSettings);
        }, 300);
    };

    const dispatch = useDispatch();
    const toggleDarkMode = () => dispatch({type: "Layout/TOGGLE_DARKMODE"});
    const toggleMenu = () => dispatch({type: "Layout/TOGGLE_SIDEBAR"});

    const openedSideMenu = !isMobile || openedMenu;

    return (
        <nav className={classes.root}>
            {!isMobile || !openedMenu ? (
                <div className={classes.options}>
                    <Connected>
                        <MediaQuery query={`(max-width: ${mediaQuerySizeXs}px)`}>
                            <div className={classes.optionItemSmall} onClick={() => toggleMenu()}>
                                <Icon color={theme.palette.primary.contrastText}>Menu</Icon>
                            </div>
                        </MediaQuery>
                    </Connected>
                    <NavLink className={classes.logo} to={`/app/dashboard`} onClick={() => handleCloseWidget()}>
                        <div className={classes.optionItem}>
                            <img src="/assets/logos/smart.png" alt="logo" className={classes.img} />
                        </div>
                    </NavLink>
                </div>
            ) : (
                <div className={classes.emptyDiv} />
            )}
            {openedSideMenu && (
                <div className={classes.sideOptions}>
                    <div className={classes.options}>
                        <div
                            className={classes.optionItem}
                            onClick={handleClickSettings}
                            data-test-id="header-icon-params">
                            <Icon color={theme.palette.primary.contrastText}>MoreVert</Icon>
                            <Icon color={theme.palette.primary.contrastText}>{!anchorElSettings ? "Down" : "Up"}</Icon>
                        </div>
                    </div>
                    <Connected>
                        <ProfileOptions
                            classes={classes}
                            handleCloseAvatar={handleCloseAvatar}
                            handleClickAvatar={handleClickAvatar}
                            anchorElAvatar={anchorElAvatar}
                        />
                    </Connected>
                </div>
            )}
            <MediaQuery query={`(max-width: ${mediaQuerySizeXs}px)`}>
                <div className={classes.options} onClick={() => setOpenedMenu((e) => !e)}>
                    <div className={classes.optionItemSmall} data-test-id="header-icon-admin">
                        <Icon color={theme.palette.primary.contrastText}>More</Icon>
                    </div>
                </div>
            </MediaQuery>
            <Popper anchorEl={anchorElSettings} handleClose={handleCloseSettings} width={350}>
                <MenuList>
                    <MenuItem
                        className={classes.menuItem}
                        onClick={() => toggleDarkMode()}
                        data-test-id="header-menuItem-darkmode">
                        <Icon className={classes.iconRight}>Bulb</Icon>
                        <SmallTitle light>
                            {t("header.settings.theme")}:{" "}
                            {isDarkMode ? t("header.settings.enable") : t("header.settings.disable")}
                        </SmallTitle>
                    </MenuItem>
                    <Divider />
                    <div className={classes.menuItem} data-test-id="header-menuItem-darkmode">
                        <div className={classes.zoomContainer}>
                            <div className={classes.zoomContainerRight}>
                                <Icon className={classes.iconRight}>Monitor</Icon>
                                <div>
                                    <SmallTitle light>{t("header.settings.zoom")}</SmallTitle>
                                </div>
                            </div>
                            <div className={classes.zoomContainerLeft}>
                                <IconButton onClick={() => handleUnZoom()} className={classes.iconLeft}>
                                    <Icon>ZoomOut</Icon>
                                </IconButton>
                                <SmallTitle light>{(zoom * 100).toFixed(0)}%</SmallTitle>
                                <IconButton onClick={() => handleZoom()} className={classes.iconRight}>
                                    <Icon>ZoomIn</Icon>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div>
                        <div className={classes.menuItemSubOptionsTitle}>
                            <Icon className={classes.iconCenter}>Global</Icon>
                            <SmallTitle>{t("header.settings.language")}</SmallTitle>
                        </div>
                        <div className={classes.menuItemSubOptions}>
                            <MenuItem data-test-id="header-menuItem-langue-en" onClick={() => changeLanguage("en")}>
                                <SmallTitle light={i18n.language !== "en"} bold={i18n.language === "en"}>
                                    {t("header.settings.en")}
                                </SmallTitle>
                            </MenuItem>
                            <MenuItem data-test-id="header-menuItem-langue-fr" onClick={() => changeLanguage("fr")}>
                                <SmallTitle light={i18n.language !== "fr"} bold={i18n.language === "fr"}>
                                    {t("header.settings.fr")}
                                </SmallTitle>
                            </MenuItem>
                        </div>
                    </div>
                </MenuList>
            </Popper>
        </nav>
    );
};

export default withStyles(style)(Header);
