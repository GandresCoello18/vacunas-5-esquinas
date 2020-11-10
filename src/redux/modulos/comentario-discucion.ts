import { Dispatch } from "redux";
import { Comentario_Discucion_INT } from "../../interface";
import { getComentarioDiscucion } from "../../api/comentario";

/// CONSTANTES

export interface initialData {
  Comentarios_Discuciones: Array<Comentario_Discucion_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  Comentarios_Discuciones: [],
  loading: true,
  error: "",
};

const GET_COMENTARIO_DISCUCION = "GET_COMENTARIO_DISCUCION";
const SET_COMENTARIO_DISCUCION = "SET_COMENTARIO_DISCUCION";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_COMENTARIO_DISCUCION:
      return {
        ...state,
        Comentarios_Discuciones: action.payload,
        loading: false,
      };
    case SET_COMENTARIO_DISCUCION:
      return { ...state, Comentarios_Discuciones: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getComentarioDiscuciones = () => (dispatch: Dispatch) => {
  getComentarioDiscucion().then((res) => {
    dispatch({
      type: GET_COMENTARIO_DISCUCION,
      payload: res.data,
    });
  });
};

export const setComentarioDiscuciones = (
  comentarios: Array<Comentario_Discucion_INT>
) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_COMENTARIO_DISCUCION,
    payload: comentarios,
  });
};
