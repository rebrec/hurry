import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";
import store from '../store/RootStore';
import "./index.scss";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
        <App  />,
    document.getElementById("root")
);
