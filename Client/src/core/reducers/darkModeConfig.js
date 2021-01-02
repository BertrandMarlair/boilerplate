import {getLocalstorage, setLocalstorage} from "../localstorage/localStorage";

const localDarkMode = getLocalstorage("dark-mode-enabled");

export const initialState = {
    isDarkMode: localDarkMode,
};

export const TOGGLE_DARKMODE = "Layout/TOGGLE_DARKMODE";
export const RESET_DARKMODE = "Layout/RESET_DARKMODE";

export default function DarkModeReducer(state = initialState, {type}) {
    switch (type) {
        case TOGGLE_DARKMODE:
            setLocalstorage("dark-mode-enabled", !state.isDarkMode);
            return {
                ...state,
                isDarkMode: !state.isDarkMode,
            };
        case RESET_DARKMODE:
            setLocalstorage("dark-mode-enabled", null);
            return {
                ...state,
                isDarkMode: null,
            };
        default:
            return state;
    }
}
