import {displayBetween, mediaQuerySizeXs} from "../../../core/style/constant";

const containerHeight = 650;

const style = (theme) => ({
    root: {
        margin: "auto",
        maxWidth: 1200,
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
    card: {
        width: "100%",
        minHeight: 600,
        maxHeight: containerHeight,
        overflow: "hidden",
        ...displayBetween,
        padding: 0,
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            padding: 10,
            margin: 0,
            flexDirection: "column-reverse",
            minHeight: "unset",
            maxHeight: "unset",
        },
    },
    cardItemLeft: {
        width: "45%",
        position: "relative",
        display: "flex",
        height: "-webkit-fill-available",
        borderBottom: `${containerHeight}px solid ${theme.palette.primary.main}`,
        borderRight: "85px solid transparent",
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            width: "100%",
            height: "auto",
            borderBottom: "unset",
            borderRight: "unset",
            backgroundColor: theme.palette.primary.main,
            borderRadius: 8,
        },
    },
    cardItemRight: {
        width: "55%",
        display: "flex",
        height: "-webkit-fill-available",
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            width: "100%",
            height: "auto",
        },
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "auto",
        maxWidth: 400,
        height: containerHeight,
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            height: "auto",
            marginTop: 30,
            marginBottom: 30,
        },
    },
    cardContentPass: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "auto",
        height: containerHeight,
        position: "absolute",
        padding: 10,
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            height: "auto",
            marginTop: 30,
            marginBottom: 30,
            position: "relative",
        },
    },
    title: {
        marginBottom: 20,
    },
    description: {
        marginBottom: 30,
    },
    label: {
        margin: "5px 0",
    },
    input: {
        marginBottom: 10,
        width: "100%",
    },
    inputFirstname: {
        marginBottom: 10,
        marginRight: 10,
        width: "100%",
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            marginRight: 0,
        },
    },
    inputLastname: {
        marginBottom: 10,
        marginLeft: 10,
        width: "100%",
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            marginLeft: 0,
        },
    },
    inputCol: {
        ...displayBetween,
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            flexDirection: "column",
        },
    },
    form: {
        width: "100%",
    },
    formFooter: {
        marginTop: 30,
    },
    imageContainer: {
        width: "50%",
        textAlign: "center",
        margin: "50px auto",
    },
    image: {
        width: "100%",
    },
    link: {
        color: "#45a0ff",
        textDecoration: "underline",
        cursor: "pointer",
    },
    conditions: {
        borderRadius: 7,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default style;
