import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./dot/reconciliation";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./App.css";
import Test from "./test/test";
import Test3 from "./test/test3";
import Test4 from "./test/test4";
import Test6 from "./test/test6";

ReactDOM.render(<Test6></Test6>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
