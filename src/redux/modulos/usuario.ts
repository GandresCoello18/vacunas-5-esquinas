import { Dispatch } from "redux";

/// CONSTANTES

export interface initialData {
  Usuarios: Array<any>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  Usuarios: [],
  loading: true,
  error: "",
};

const GET_USUARIOS = "GET_USUARIOS";
const SET_USUARIOS = "SET_USUARIOS";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_USUARIOS:
      return { ...state, Usuarios: action.payload, loading: false };
    case SET_USUARIOS:
      return { ...state, Usuarios: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getUsuarios = () => (dispatch: Dispatch) => {
  /*obtenerUsuarios().then(res => {
        dispatch({
            type: GET_USUARIOS,
            payload: res.data,
        });
    });*/
};

export const getMyUser = (usuarios: any) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_USUARIOS,
    payload: usuarios,
  });
};
