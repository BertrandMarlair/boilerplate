import axios from "axios";
import {ENDPOINT, ACCESS_TOKEN_NAME} from "../constants";
import {getLocalstorage} from "../localstorage/localStorage";

export const uploadHubspot = (params) => {
    return new Promise((resolve) => {
        const formData = new FormData();

        formData.append("file", params.file);
        formData.append("issueId", params.issueId);

        axios({
            method: "post",
            url: `${ENDPOINT}/file-upload-hubspot`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                [ACCESS_TOKEN_NAME]: getLocalstorage(ACCESS_TOKEN_NAME),
            },
        })
            .then((res) => {
                resolve({success: true, error: "", data: {...res.data}});
            })
            .catch((error) => {
                resolve({success: false, error: error.code});
            });
    });
};
