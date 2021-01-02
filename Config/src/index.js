import express from "express";
import http from "http";
import bodyParser from "body-parser";
import ora from "ora";
import chalk from "chalk";
import cors from "cors";
import routes from "./core/routes";

console.log('------CONFIGURATION------');

const spinner = ora();
const app = express();
const httpServer = http.createServer(app);

const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.text({type: "application/json"}));

routes.forEach(route => {
    app[route.type](route.path, (req, res) => {
        route.controller(req, res);
    });
});

httpServer.listen(3002, () => {
    spinner.succeed();
    console.log(
        chalk.green("✓"),
        `Server ready. -> start on http://localhost:3002/`,
    );
});

httpServer.on("error", error => {
    spinner.fail();
    console.log("💣", chalk.red("error:"), error.message);
});
