import {heightAppBar, displayVerticalCenter, widthSideBarOpnend} from "../../core/style/constant";

const style = (theme) => ({
    root: {
        left: 0,
        marginTop: heightAppBar,
        position: "fixed",
        boxShadow: theme.palette.boxShadow.main,
        height: `calc(100% - ${heightAppBar}px)`,
        background: theme.palette.background.paper,
        transition: "0.3s",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 1299,
    },
    head: {
        height: 60,
        padding: "5px 0",
        borderBottom: theme.palette.border.colored,
        ...displayVerticalCenter,
    },
    subHead: {
        height: 60,
        padding: "5px 0",
        borderBottom: theme.palette.border.colored,
        ...displayVerticalCenter,
    },
    menuSubItemId: {
        marginLeft: 15,
    },
    content: {
        flexGrow: 1,
    },
    footer: {
        height: 60,
        ...displayVerticalCenter,
    },
    menuItem: {
        height: 52,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        width: "100%",
    },
    icon: {
        paddingRight: 18,
        paddingLeft: 15,
        borderLeft: "4px solid transparent",
        height: "100%",
        ...displayVerticalCenter,
    },
    collapseIcon: {
        marginRight: 5,
        paddingLeft: 5,
        height: "100%",
        ...displayVerticalCenter,
    },
    menuItemText: {
        transition: "0.3s",
        marginLeft: 5,
        paddingRight: 5,
        minWidth: widthSideBarOpnend - 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerAvatar: {
        height: "80%",
        width: "80%",
        margin: 7,
        borderRadius: "100%",
        border: theme.palette.border.main,
        padding: 4,
    },
});

export default style;
