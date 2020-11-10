import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import UsuarioReducer, { getUsuarios } from "./modulos/usuario";
import Representantes, { getRepresentante } from "./modulos/representante";
import SessionReducer, { getSesion } from "./modulos/session";
import PacienteReducer, { getPacientes } from "./modulos/pacientes";
import DiscucionesReducer, { getDiscuciones } from "./modulos/discucion";
import VacunasReducer, { getVacunas } from "./modulos/vacuna";
import ComentariosReducer, {
  getComentarioDiscuciones,
} from "./modulos/comentario-discucion";
import Cookies from "js-cookie";
import { fecha_actual } from "../hooks/fecha";

const rootReducer = combineReducers({
  UsuarioReducer,
  Representantes,
  SessionReducer,
  PacienteReducer,
  DiscucionesReducer,
  VacunasReducer,
  ComentariosReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  Cookies.get("id-user") && getUsuarios(Cookies.get("id-user"))(store.dispatch);
  Cookies.get("id-user") && getSesion(Cookies.get("id-user"))(store.dispatch);

  getRepresentante()(store.dispatch);
  getPacientes()(store.dispatch);
  getDiscuciones(fecha_actual())(store.dispatch);
  getVacunas()(store.dispatch);
  getComentarioDiscuciones()(store.dispatch);

  return store;
}

const store = generateStore();
export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
