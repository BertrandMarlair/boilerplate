import fetch from "node-fetch";
import getServiceUri from "./getServiceUri";
import { AuthenticationError } from "apollo-server-express";
import { checkAuthAccessToken } from "./auth";
import { getAuthorizationQueryDomoticz, getAuthorizationQueryAuthentification } from "./constants";

const {REFRESH_TOKEN, ACCESS_TOKEN} = process.env;

export const fetcher = async (uri, req) => {
    const body = JSON.parse(req.body);

    console.log(body.operationName);

    if(body.operationName === "IntrospectionQuery"){
        return await fetch(uri, req).then((res) => {
            return res
        }).catch((err) => {
            return err
        });
    }
    const refreshToken = req.headers[REFRESH_TOKEN];
    const accessToken = req.headers[ACCESS_TOKEN];


    if(refreshToken){
        if(getServiceUri("auth") === uri){
            if("refreshTokens" === body.operationName){
                return await fetch(uri, req).then((res) => {
                    return res
                }).catch((err) => {
                    return err
                });
            }
       } else {
            throw new AuthenticationError("When you send refresh, it's only for get new access token.");
       }
    }
    
    if(accessToken){
        await checkAuthAccessToken(accessToken.replace("Bearer ", ""));
        return await fetch(uri, req).then((res) => {
            return res
        }).catch((err) => {
            return err
        });
    }

    if(!accessToken && !refreshToken){
        if(getServiceUri("auth") === uri){
            if(getAuthorizationQueryAuthentification.includes(body.operationName)){
                return await fetch(uri, req).then((res) => {
                    return res
                }).catch((err) => {
                    return err
                });
            }
            throw new AuthenticationError("You can't access to this request if you are not authentified.");
        } else {
            if(getServiceUri("domoticz") === uri){
                if(getAuthorizationQueryDomoticz.includes(body.operationName)){
                    return await fetch(uri, req).then((res) => {
                        return res
                    }).catch((err) => {
                        return err
                    });
                }
            }
            throw new AuthenticationError("You can't access to this request if you are not authentified.");
        }
    }
};