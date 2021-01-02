import {createStore, combineReducers, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import layout from "../reducers/sideBarConfig";
import connected from "../reducers/connectConfig";
import darkMode from "../reducers/darkModeConfig";
import theme from "../reducers/themeConfig";
import loading from "../reducers/loadingConfig";

const rootReducer = combineReducers({
    layout,
    connected,
    darkMode,
    theme,
    loading,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const configureStore = () => store;

export default configureStore;
