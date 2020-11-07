import { Dispatch } from "redux";
import { Usuario_INT } from "../../interface";
import { GetSession } from "../../api/usuarios";

export interface initialData {
  MyUser: Usuario_INT;
  loading: boolean;
  fetching: boolean;
}

// contantes
const initialData: initialData = {
  loading: false,
  fetching: false,
  MyUser: {
    id_usuario: "",
    userName: "",
    email: "",
    status: "",
    photoURL: "",
    isadmin: false,
    fecha_registro: "",
  },
};

const LOGIN = "LOGIN";
const ERROR_LOGIN = "ERROR_LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOG_OUT = "LOG_OUT";

// reducer

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case ERROR_LOGIN:
      return { ...state, fetching: false, error: action.payload };
    case LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        loggin: true,
        MyUser: action.payload,
      };
    case LOG_OUT:
      return { ...initialData };
    default:
      return state;
  }
}

// actiones

export const getSesion = (id_usuario: string | any) => (dispatch: Dispatch) => {
  GetSession(id_usuario).then((res) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.session,
    });
  });
};

export const loGOutSession = () => (dispatch: Dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
};

export const doGoogleLoginAction = (user: Usuario_INT | any) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: LOGIN,
  });

  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      id_usuario: user.uid,
      userName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    },
  });
};
