import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import UsuarioReducer from "./modulos/usuario";
import Representantes, { getRepresentante } from "./modulos/representante";
import SessionReducer, { getSesion } from "./modulos/session";
import PacienteReducer from "./modulos/pacientes";
import Cookies from "js-cookie";

const rootReducer = combineReducers({
  UsuarioReducer,
  Representantes,
  SessionReducer,
  PacienteReducer,
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

  getRepresentante()(store.dispatch);
  Cookies.get("id-user") && getSesion(Cookies.get("id-user"))(store.dispatch);

  return store;
}

const store = generateStore();
export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
