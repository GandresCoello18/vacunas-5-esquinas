import { Dispatch } from "redux";
import { MyUser } from "../../interface";

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

// actiones

export const loGOutSession = () => (dispatch: Dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
};

export const doGoogleLoginAction = (user: MyUser) => (dispatch: Dispatch) => {
  dispatch({
    type: LOGIN,
  });

  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    },
  });
};
