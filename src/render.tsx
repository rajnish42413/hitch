import * as React from "react";

import "antd/dist/antd.css";
import './scss/variables.scss';
import "./scss/app.scss";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Pizza from "./components/Pizza";
import Info from "./components/Info";

function Root({ children }: any) {
    return (
        <Router>
            <div className="">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/pizzas/:pizza" component={Pizza} />
                    <Route path="/order-place" component={Info} />
                </Switch>
            </div>
        </Router>
    );
}

export default (root: Element) => {
    render(<Root />, root);
};
