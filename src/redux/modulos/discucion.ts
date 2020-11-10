import { Dispatch } from "redux";
import { Discucion_Menciones_INT } from "../../interface";
import { getDiscucion } from "../../api/discucion";

/// CONSTANTES

export interface initialData {
  Discuciones: Array<Discucion_Menciones_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  Discuciones: [],
  loading: true,
  error: "",
};

const GET_DISCUCION = "GET_DISCUCION";
const SET_DISCUCION = "SET_DISCUCION";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_DISCUCION:
      return { ...state, Discuciones: action.payload, loading: false };
    case SET_DISCUCION:
      return { ...state, Discuciones: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getDiscuciones = (fecha: string) => (dispatch: Dispatch) => {
  getDiscucion(fecha).then((res) => {
    dispatch({
      type: GET_DISCUCION,
      payload: res.data,
    });
  });
};

export const setDiscuciones = (discuciones: Array<Discucion_Menciones_INT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_DISCUCION,
    payload: discuciones,
  });
};
