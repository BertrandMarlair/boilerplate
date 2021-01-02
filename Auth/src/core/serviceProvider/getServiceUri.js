const {
    DOMOTICZ_HOST, 
    DOMOTICZ_PORT, 
    AUTH_PORT, 
    AUTH_HOST,
} = process.env;

export default service => {
    switch (service) {
        case "domoticz":
            return `http://${DOMOTICZ_HOST}:${DOMOTICZ_PORT}/explore`;
        case "auth":
            return `http://${AUTH_HOST}:${AUTH_PORT}/explore`;
        default:
            return null;
    }
};
