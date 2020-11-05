import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import UsuarioReducer from "./modulos/usuario";
import SessionReducer from "./modulos/session";

const rootReducer = combineReducers({
  UsuarioReducer,
  SessionReducer,
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

  //getProductos()(store.dispatch);
  return store;
}

const store = generateStore();
export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
