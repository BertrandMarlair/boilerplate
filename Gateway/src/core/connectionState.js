import fetch from "node-fetch";

export const checkConnectionState = endpoint => {
    const FETCH_TIMEOUT = 5000;
    let didTimeOut = false;

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            didTimeOut = true;
            reject({...endpoint, connected: false});
        }, FETCH_TIMEOUT);
        
        fetch(`http://${endpoint.domain}/${endpoint.httpLocation}`)
        .then(() => {
            clearTimeout(timeout);
            if(!didTimeOut) {
                resolve({...endpoint, connected: true});
            }
        })
        .catch(() => {
            if(didTimeOut) return;
            reject({...endpoint, connected: false});
        });
    })
    .then((res) => res)
    .catch((err) => err);
};
