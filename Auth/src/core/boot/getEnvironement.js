import { CONFIG_HOST, CONFIG_PORT, NEEDED_ENV } from "../constants";
import {wait} from "../utils/misc";
import rsaGeneration from "./rsaGeneration";
import fetch from "node-fetch";

export default async () => {
    let maxReconnect = 20,
    connected = false,
    envVariables = null;
    
    const params = {
        env: NEEDED_ENV,
    };
    
    while (!connected && maxReconnect) {
        if(maxReconnect === 100){
            throw new Error("Fail to get config env, stop server")
        }
        try {
            envVariables = await fetch(
                `http://${CONFIG_HOST}:${CONFIG_PORT}/config`, 
                {  
                    method: 'post', 
                    body: JSON.stringify(params), 
                    headers: { 'Content-Type': 'application/json' },
                }
            )  
            .then((res) => {
                connected = true
                return res
            })
            .then((res) => res.json())
        } catch (err) {
            console.error(`${err.message}: reconnecting in 5 seconds`);
            maxReconnect--;
            await wait(5000);
        }
    }
    if (!connected) {
        return null;
    }

    envVariables.forEach(params => {
        process.env[params.name] = params.value
    });

    const keyPair = await rsaGeneration(process.env.SECRET_REGISTER);

    process.env.PUBLIC_KEY = keyPair.publicKey
    process.env.PRIVATE_KEY = keyPair.privateKey

    return envVariables
};