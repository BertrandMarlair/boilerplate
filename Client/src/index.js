import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./core/i18n/i18n";

const $app = document.querySelector("#root");

ReactDOM[$app.hasChildNodes() ? "hydrate" : "render"](<App />, $app);
