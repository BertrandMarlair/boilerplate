const formatErrors = (err) => {
    return [{path: "", message: err.message || err}];
};

export default formatErrors;
