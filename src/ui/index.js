import * as React from "react";
import * as ReactDOM from "react-dom";
import api from '../core/api'
import App from "./app";
import "./index.scss";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap'


api._init();
window.api = api;

ReactDOM.render(
            <App  />,
        document.getElementById("root")
);