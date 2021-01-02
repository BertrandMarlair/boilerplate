import {useEffect, useState} from "react";
import {validateEmail} from "../utils/misc";

export const useValidationField = (value, validating, params) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        check();
    }, [validating]);

    const check = () => {
        switch (params.type) {
            case "text":
                if (typeof value !== "string") {
                    setError("error.validation.isNotString");
                }
                if (params.noSpace) {
                    if (/\s/.test(value)) {
                        setError("error.validation.containSpace");
                    }
                }
                if (params.noSpecialChar) {
                    if (/[^A-Za-z0-9]+/g.test(value)) {
                        setError("error.validation.containSpacialChar");
                    }
                }
                if (params.len[0]) {
                    if (params.len[0] > value.lenght) {
                        setError("error.validation.isTooShort");
                    }
                }
                if (params.len[1]) {
                    if (params.len[1] < value.lenght) {
                        setError("error.validation.isTooLong");
                    }
                }
                break;
            case "number":
                if (typeof value !== "number") {
                    setError("error.validation.isNotNumber");
                }
                if (params.len[0]) {
                    if (params.len[0] > value) {
                        setError("error.validation.isTooSmall");
                    }
                }
                if (params.len[1]) {
                    if (params.len[1] < value) {
                        setError("error.validation.isTooBig");
                    }
                }
                break;
            case "email":
                if (validateEmail(value)) {
                    setError("error.validation.isNotEmail");
                }
                break;
            case "password":
                if (params.len[0]) {
                    setError("error.validation.isNotEmail");
                }
                if (params.len[0]) {
                    if (params.len[0] > value) {
                        setError("error.validation.passwordIsTooSmall");
                    }
                }
                break;
        }
    };

    return validating ? error : null;
};
