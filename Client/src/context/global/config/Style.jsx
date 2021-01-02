import {heightAppBar} from "../../../core/style/constant";

const style = () => {
    return {
        drawer: {
            transition: "0.2s",
            width: "100%",
            height: "100%",
            marginTop: heightAppBar,
        },
        drawerSmall: {
            minHeight: "100%",
        },
        logo: {
            height: "100%",
        },
    };
};

export default style;
