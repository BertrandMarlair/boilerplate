import React, {Suspense, useMemo, useEffect} from "react";
import {Provider, useSelector} from "react-redux";
import {withTranslation, useTranslation} from "react-i18next";
import configureStore from "../core/store/store";
import AppoloProvider from "./AppoloProvider";
import {setLocalstorage} from "../core/localstorage/localStorage";
import MuiProvider from "./MuiProvider";
import moment from "moment";
import "moment/locale/fr";
import LoaderLayout from "../components/loading/LoaderLayout";

const Container = () => {
    const translation = useTranslation();

    const connect = useSelector((state) => state.connected);
    const {connected} = connect;

    useEffect(() => {
        setLocalstorage("key", new Date().getTime());
        moment.locale(translation.i18n.language);
    }, []);

    const Appolo = useMemo(() => {
        return <AppoloProvider connected={connected} />;
    }, [connected]);

    return Appolo;
};

const Wrapper = withTranslation()(Container);

const App = () => (
    <Provider store={configureStore()}>
        <MuiProvider>
            <Suspense fallback={<LoaderLayout />}>
                <Wrapper />
            </Suspense>
        </MuiProvider>
    </Provider>
);

export default App;
