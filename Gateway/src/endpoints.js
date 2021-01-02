const {DOMOTICZ_HOST, DOMOTICZ_PORT, AUTH_PORT, AUTH_HOST} = process.env

export default [
    {
        domain: `${DOMOTICZ_HOST}:${DOMOTICZ_PORT}`,
        subscription: true,
        httpLocation: "explore",
        wsLocation: "graphql",
    },
    {
        domain: `${AUTH_HOST}:${AUTH_PORT}`,
        subscription: false,
        httpLocation: "explore",
    },
];
