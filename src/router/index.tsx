import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NotFound } from "../pages/not-found";
import { HomePage } from "../pages/home";
import { VacunasPage } from "../pages/vacunas";
import { LoginPage } from "../pages/login";
import { PrivateRoute } from "./private";
import { PacientesPage } from "../pages/pacientes";
import { PubliceRoute } from "./public";
import { AdminPage } from "../pages/admin";
import { DiscucionesPage } from "../pages/discuciones";
import { RepresentantePage } from "../pages/representante";
import { MisMenciones } from "../pages/mis-menciones";
import { MisVacunas } from "../pages/mis-vacunas";
import { MisEstadisticas } from "../pages/mis-estadisticas";

export default function Routes() {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Switch>
          <PubliceRoute path="/login" component={LoginPage} />
          <PrivateRoute path="/vacunas/:render" component={VacunasPage} />
          <PrivateRoute path="/pacientes/:render" component={PacientesPage} />
          <PrivateRoute
            path="/representantes/:render"
            component={RepresentantePage}
          />
          <PrivateRoute path="/admin/:render" component={AdminPage} />
          <PrivateRoute
            path="/discuciones/:render"
            component={DiscucionesPage}
          />
          <PrivateRoute
            path="/mis-menciones/:id_paciente"
            component={MisMenciones}
          />
          <PrivateRoute
            path="/mis-vacunas/:id_paciente"
            component={MisVacunas}
          />
          <PrivateRoute
            path="/mis-estadisticas/:id_paciente"
            component={MisEstadisticas}
          />
          <PrivateRoute path="/" component={HomePage} />
          <Route exact path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
