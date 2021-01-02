/* eslint-disable no-undef */
import ora from "ora";
import http from "http";
import chalk from "chalk";
import Redis from "ioredis";
import express from "express";
import {wait} from "./core/utils/misc";
import {getRemoteSchema} from "./core/remote";
import {createServer} from "./core/apollo-server";
import {checkConnectionState} from "./core/connectionState";
import {checkAuthAccessToken} from "./core/auth";
import proxies from "./proxy";
import proxy from "express-http-proxy";
import cors from "cors";
import routes from "./core/routes";
import bodyParser from "body-parser";
import {FILE_SIZE, ONE_MINUTE} from "./core/constants";

export default async () => {
    const {GATEWAY_HOST, GATEWAY_PORT, REDIS_PORT, REDIS_HOST, NODE_ENV, DOMAIN, CORS} = process.env

    const spinner = ora();

    const endpoints = await import('./endpoints')

    try {
        spinner.start();

        const redis = new Redis({
            port: REDIS_PORT,
            host: REDIS_HOST,
        });
    
        redis.subscribe("updateServer");
    
        redis.on("message", async () => {
            console.log("Restart Gateway in 2 seconds");
            await wait(2000)
            startServer(true);
        });

        const startServer = async restart => {
            try {
                if (!restart) {
                    console.info("Creating HTTP server");
        
                    process.httpServer = http.createServer();
        
                    const configuration = configureHttpServer(process.httpServer);
        
                    if(configuration){
                        const app = process.httpServer.listen(GATEWAY_PORT, () => {
                            console.info(
                                chalk.green("✓"),
                                `Server ready. -> start on ${GATEWAY_HOST}:${GATEWAY_PORT}/`,
                            );
                        });

                        app.setTimeout(500000);
                        process.httpServer.timeout = ONE_MINUTE * 10;
                    } else {
                        throw "Fail to configure"
                    }
                } else {
                    console.info("Reloading HTTP server");
                    process.httpServer.removeAllListeners("upgrade");
                    process.httpServer.removeAllListeners("request");
        
                    configureHttpServer(process.httpServer);
        
                    console.info("HTTP server reloaded");
                }
            } catch (err) {
                spinner.fail();
                console.log("💣", "reconnecting in 5 seconds");
                console.log("💣", err.message);
                await wait(5000);
                startServer(false);
            }
        };
    
        const configureHttpServer = async httpServer => {
            console.info("Creating Express app");
            const app = express();

            routes.forEach(route => {
                app[route.type](route.path, (req, res) => {
                    route.controller(req, res);
                });
            });    

            const corsOptions = {
                origin: CORS !== "false" ? DOMAIN : "*",
                credentials: true,
                optionsSuccessStatus: 200
            };

            app.use(cors(corsOptions));
            app.use(bodyParser.text({ type: 'application/graphql' }));
           
            console.info("Creating Apollo server");
            const EndpointConnection = await Promise.all(
                endpoints.default.map(ep => checkConnectionState(ep)),
            );

            EndpointConnection
                .filter(ep => !ep.connected)
                .map(ep => console.log("💣", `Fail to connect to ${ep.domain}`));

            const checkedEndpointConnection = EndpointConnection.filter(ep => ep.connected);

            if(checkedEndpointConnection.length){
                const allSchemas = await Promise.all(
                    checkedEndpointConnection
                        .filter(ep => ep.connected)
                        .map(ep => getRemoteSchema(ep)),
                );
        
                const endpoint = createServer(
                    NODE_ENV === "development" ? true : false,
                    allSchemas,
                );
        
                console.info("Express app created with Apollo middleware");
                
                proxies.forEach(({domain, httpRedirection, authorization, httpFrom, originalUrl}) => {
                    app.use(httpFrom, proxy(domain, {
                        proxyReqOptDecorator: async (proxyReqOpts, req) => {
                            if(authorization) {
                                let token = null;
                                if(req.headers && req.headers["access-token"]) {
                                    token = req.headers["access-token"].replace("Bearer ", "");
                                } else if(req.query && req.query["access-token"]) {
                                    token = req.query["access-token"].replace("Bearer ", "");
                                }
    
                                if(token) {
                                    await checkAuthAccessToken(token);
                                    proxyReqOpts.headers['access-token'] = token;
                                    return proxyReqOpts;
                                } else {
                                    throw new Error("You must supply a JWT for authorization");
                                }
                            }
                            return proxyReqOpts;
                        },
                        proxyReqPathResolver: async (req) => {
                            const redirection = originalUrl ? req.originalUrl : httpRedirection
                            try {
                                return redirection
                            } catch (err) {
                                console.log(err)
                                throw new Error(err.message)
                            }
                        },
                        timeout: ONE_MINUTE * 10,
                        limit: FILE_SIZE,
                    }));
                });
        
                endpoint.applyMiddleware({app: app, path: "/explore"});
                httpServer.on("request", app);
                endpoint.installSubscriptionHandlers(httpServer);
                spinner.succeed();

                return true
            }
        };

        startServer();
    } catch (error) {
        spinner.fail();
        console.log("💣", error.message);
        console.log("💣", "reconnecting in 5 seconds");
        startServer(false);
    }
}