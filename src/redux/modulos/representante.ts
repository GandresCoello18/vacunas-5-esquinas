import { Dispatch } from "redux";
import { Representantes_INT } from "../../interface";
import { GetRepresentante } from "../../api/representante";

/// CONSTANTES

export interface initialData {
  Representante: Array<Representantes_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  Representante: [],
  loading: true,
  error: "",
};

const GET_REPRESENTANTE = "GET_REPRESENTANTE";
const SET_REPRESENTANTE = "SET_REPRESENTANTE";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_REPRESENTANTE:
      return { ...state, Representante: action.payload, loading: false };
    case SET_REPRESENTANTE:
      return { ...state, Representante: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getRepresentante = () => (dispatch: Dispatch) => {
  GetRepresentante().then((res) => {
    dispatch({
      type: GET_REPRESENTANTE,
      payload: res.data,
    });
  });
};

export const SetRepresentante = (representantes: any) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_REPRESENTANTE,
    payload: representantes,
  });
};
