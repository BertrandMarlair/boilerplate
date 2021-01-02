import axios from "axios";
import {getLocalstorage} from "../localstorage/localStorage";
import {ACCESS_TOKEN_NAME, ENDPOINT} from "../constants";

export default ({url, name}) =>
    axios({
        url: `${ENDPOINT}${url}`,
        method: "GET",
        responseType: "blob",
        headers: {
            [ACCESS_TOKEN_NAME]: getLocalstorage(ACCESS_TOKEN_NAME),
        },
    }).then((response) => {
        const href = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        link.href = href;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
    });
