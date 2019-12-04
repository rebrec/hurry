import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";
import "./index.scss";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

const rootStore = new RootStore();
ReactDOM.render(
    <Provider rootStore = {rootStore}>
        <App />, document.getElementById("root")
    </Provider>
);
