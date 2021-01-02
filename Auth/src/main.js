import express from "express";
import http from "http";
import bodyParser from "body-parser";
import ora from "ora";
import chalk from "chalk";
import cors from "cors";
import {createServer} from "./core/boot/apolloServer";
import {autoRestartGateway} from "./core/serviceProvider/autoRestartGateway";
import routes from "./core/routes";
import {wait} from "./core/utils/misc";

const spinner = ora();
const app = express();
const httpServer = http.createServer(app);
const corsOptions = {
    origin: "*",
    credentials: true,
};
const {AUTH_HOST, AUTH_PORT, NODE_ENV} = process.env;

app.use(cors(corsOptions));

app.use(bodyParser.text({type: "application/graphql"}));

spinner.start("Starting server...");

routes.forEach(route => {
    app.post(route.path, (req, res) => {
        route.controller(req, res);
    });
});

const init = async () => {
    try {
        const endpoint = createServer(NODE_ENV === "development" && true);

        endpoint.installSubscriptionHandlers(httpServer);
        endpoint.applyMiddleware({app, path: "/"});
        autoRestartGateway();

        httpServer.listen(AUTH_PORT, () => {
            spinner.succeed();
            console.log(
                chalk.green("✓"),
                `Server ready. -> start on ${AUTH_HOST}:${AUTH_PORT}/`,
            );
        });
    } catch (err) {
        spinner.fail();
        await wait(5000);
        console.log("💣", err.message);
        console.log("💣", "reconnecting in 5 seconds");
        init();
    }
};

init();

httpServer.on("error", error => {
    spinner.fail();
    console.log(error);
    console.log("💣", chalk.red("error:"), error.message);
});
