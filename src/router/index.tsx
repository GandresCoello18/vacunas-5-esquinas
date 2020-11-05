import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NotFound } from "../pages/not-found";
import App from "../App";
import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { PrivateRoute } from "./private";
import { PubliceRoute } from "./public";

export default function Routes() {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Switch>
          <PubliceRoute path="/login" component={LoginPage} />
          <PrivateRoute path="/" component={HomePage} />
          <PrivateRoute path="/app" component={App} />
          <Route exact path="404" component={NotFound} />
          <Route exact component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
