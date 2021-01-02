
import slugifyRaw from "slugify";

export const isTruthy = m => !!m;
export const isFalsy = m => !m;

export const wait = ms => new Promise(r => setTimeout(r, ms));

export const slugify = s => slugifyRaw(s, {lower: true});

export const safeJSONParse = any => {
    try {
        const result = JSON.parse(any);

        return result;
    } catch {
        return null;
    }
};

export const validateEmail = email => {
    // eslint-disable-next-line no-useless-escape
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
};

export const validateUrl = url => {
    // eslint-disable-next-line no-useless-escape
    let re = /(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    return re.test(String(url));
};
