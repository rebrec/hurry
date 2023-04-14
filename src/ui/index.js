import * as React from "react";
import * as ReactDOM from "react-dom";
import api from '../core/api'
import App from "./app";
// import "./index.scss";
// import '../../node_modules/bootstrap/dist/css/bootstrap.css';
// import './css/bootstrap.css';
import './theme/scss/custom.scss';
// import 'bootstrap'


window.api = api;
api._init();


ReactDOM.render(
            <App  />,
        document.getElementById("root")
);