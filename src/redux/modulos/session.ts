import { loginWithGoogle, signOutGoogle } from "../../firebase/firebase";
import { Dispatch } from "redux";
import { MyUser } from "../../interface";
import Cookies from "js-cookie";

export interface initialData {
  MyUser: MyUser;
  loading: boolean;
  fetching: boolean;
}

// contantes
const initialData: initialData = {
  loading: false,
  fetching: false,
  MyUser: {
    uid: "",
    displayName: "",
    email: "",
    photoURL: "",
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

// aux

function saveStorage(storage: any) {
  Cookies.set("id-user", storage.uid);
}

// actiones

export const loGOutSession = () => (dispatch: Dispatch) => {
  signOutGoogle();
  dispatch({
    type: LOG_OUT,
  });
};

export const doGoogleLoginAction = () => (
  dispatch: Dispatch,
  getState: any
) => {
  dispatch({
    type: LOGIN,
  });
  return loginWithGoogle()
    .then((user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });
      saveStorage(user);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_LOGIN,
        payload: err.message,
      });
    });
};
