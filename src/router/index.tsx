import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NotFound } from "../pages/not-found";
import App from "../App";
import { HomePage } from "../pages/home";

export default function Routes() {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/app" component={App} />
          <Route exact component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
