import {request} from "graphql-request";

const getPublicKey = async () => {
    const {SECRET_REGISTER} = process.env;

    const query = `
        query keyRing {
            keyRing (token: "${SECRET_REGISTER}") {
                accessPublicKey
            }
        }
    `;
    const {AUTH_HOST, AUTH_PORT} = process.env;

    const accessPublicKey = await request(`http://${AUTH_HOST}:${AUTH_PORT}/graphql`, query)
        .then(data => data)
        .catch(err => err);

    if(accessPublicKey.keyRing && accessPublicKey.keyRing.accessPublicKey){
        return accessPublicKey.keyRing.accessPublicKey;
    }

    throw new Error('Failed to get access token');
};

export default getPublicKey;
