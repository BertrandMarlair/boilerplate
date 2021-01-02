const LoadingModalStyle = (theme) => ({
    container: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.palette.background.paper,
    },
    sideContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 400,
        height: "100vh",
        backgroundColor: theme.palette.background.default,
    },
    imgSide: {
        width: 260,
        marginTop: 350,
    },
    donutWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 250,
        minWidth: 250,
        boxShadow: "0px 0px 12px rgba(0, 9, 128, 0.1)",
        borderRadius: "100%",
        marginTop: 25,
        backgroundColor: theme.palette.white.main,
    },
    circle: {
        background: theme.palette.white.main,
    },
});

export default LoadingModalStyle;
