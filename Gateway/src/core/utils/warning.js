export default class Warning extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Warning);
        }

        this.name = "Warning";
    }
}
