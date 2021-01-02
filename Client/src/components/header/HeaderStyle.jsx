import {heightAppBar, displayBetween, displayVerticalCenter} from "../../core/style/constant";

const style = (theme) => ({
    root: {
        zIndex: 1300,
        height: heightAppBar,
        top: 0,
        width: "100%",
        position: "fixed",
        background: theme.palette.primary.main,
        ...displayBetween,
    },
    options: {
        ...displayVerticalCenter,
    },
    optionItem: {
        margin: "0 5px",
        padding: 4,
        height: 32,
        borderRadius: 6,
        transition: "0.2s",
        cursor: "pointer",
        minWidth: 50,
        ...displayVerticalCenter,
        "&:hover": {
            backgroundColor: `${theme.palette.white.main}2f`,
        },
    },
    optionItemSmall: {
        margin: "0 10px",
        padding: 4,
        borderRadius: 6,
        transition: "0.2s",
        cursor: "pointer",
        ...displayVerticalCenter,
        "&:hover": {
            backgroundColor: `${theme.palette.white.main}2f`,
        },
    },
    logo: {
        ...displayVerticalCenter,
    },
    img: {
        height: heightAppBar,
    },
    sideOptions: {
        marginRight: 15,
        ...displayVerticalCenter,
    },
    menuItem: {
        ...displayVerticalCenter,
    },
    menuItemSubOptions: {
        paddingLeft: 40,
    },
    menuItemSubOptionsTitle: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        ...displayVerticalCenter,
    },
    applicationOption: {
        display: "flex",
    },
    applicationOptionMenu: {
        minWidth: 150,
        borderRight: theme.palette.border.main,
    },
    applicationOptionMenuItem: {
        minWidth: 350,
        padding: 15,
    },
    applicationItem: {
        borderBottom: theme.palette.border.main,
        transition: "0.2s",
        cursor: "pointer",
        ...displayVerticalCenter,
        "&:hover": {
            backgroundColor: theme.palette.background.default,
        },
    },
    exploreTitle: {
        margin: "10px 0",
    },
    notificationMenuItem: {
        width: 400,
        // padding: 15,
    },
    notificationContainer: {
        width: "100%",
        maxHeight: 565,
        overflow: "auto",
    },
    notificationHeader: {
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    notificationFooter: {
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    zoomContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        margin: "0px 16px",
    },
    zoomContainerRight: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    zoomContainerLeft: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    emptyDiv: {
        flex: 1,
    },
    iconRight: {
        marginRight: 10,
    },
    iconLeft: {
        marginLeft: 10,
    },
    iconCenter: {
        margin: 10,
    },
});

export default style;
