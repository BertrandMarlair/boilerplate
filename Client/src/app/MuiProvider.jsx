import React, {useState, useEffect, useCallback, Suspense} from "react";

import {MuiThemeProvider} from "@material-ui/core/styles";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {createMuiTheme} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {SnackbarProvider} from "notistack";

import useCustomTheme from "../core/theme/theme";
import {MAX_SNACK} from "../core/constants";
import Style from "../core/style/style";

import {StylesProvider} from "@material-ui/core/styles";
import {create} from "jss";
import {createGenerateClassName, jssPreset} from "@material-ui/core/styles";
import LoaderLayout from "../components/loading/LoaderLayout";

const MuiProvider = ({children}) => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const {themeSettingsDark, themeSettingsLight} = useCustomTheme();
    const layout = useSelector((state) => state.darkMode);
    const {isDarkMode} = layout;
    const selectTheme =
        // eslint-disable-next-line no-nested-ternary
        isDarkMode !== null
            ? isDarkMode
                ? themeSettingsDark
                : themeSettingsLight
            : prefersDarkMode
            ? themeSettingsDark
            : themeSettingsLight;
    const [theme, setTheme] = useState(selectTheme);

    const editBackgroundColor = useCallback((muiTheme) => {
        if (muiTheme) {
            document.getElementsByTagName("html")[0].style.background = muiTheme.palette.background.default;
        }
    }, []);

    useEffect(() => {
        editBackgroundColor(theme);
    }, [editBackgroundColor, theme]);

    const createTheme = createMuiTheme(selectTheme);

    const toggleDarkTheme = useCallback(
        (darkMode) => {
            const muiTheme = darkMode ? themeSettingsDark : themeSettingsLight;

            setTheme(muiTheme);
            editBackgroundColor(muiTheme);
        },
        // eslint-disable-next-line
        [editBackgroundColor],
    );

    useEffect(() => {
        toggleDarkTheme(isDarkMode);
    }, [isDarkMode, toggleDarkTheme]);

    const generateClassName = createGenerateClassName({
        productionPrefix: `c${
            Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4)
        }-`,
    });
    const jss = create({
        ...jssPreset(),
    });

    return (
        <MuiThemeProvider theme={createTheme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <StylesProvider generateClassName={generateClassName} jss={jss}>
                    <Suspense fallback={<LoaderLayout />}>
                        <SnackbarProvider maxSnack={MAX_SNACK}>{children}</SnackbarProvider>
                    </Suspense>
                    <Style />
                </StylesProvider>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
};

export default MuiProvider;
