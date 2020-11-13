import { Dispatch } from "redux";
import { Vacuna_Paciente_Relacionado_INT } from "../../interface";
import { GetUsuarios } from "../../api/usuarios";

/// CONSTANTES

export interface initialData {
  Vacuna_Paciente: Array<Vacuna_Paciente_Relacionado_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  Vacuna_Paciente: [],
  loading: true,
  error: "",
};

const GET_VACUNA_PACIENTE = "GET_VACUNA_PACIENTE";
const SET_VACUNA_PACIENTE = "SET_VACUNA_PACIENTE";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_VACUNA_PACIENTE:
      return { ...state, Vacuna_Paciente: action.payload, loading: false };
    case SET_VACUNA_PACIENTE:
      return { ...state, Vacuna_Paciente: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getVP = (id_usuario: string | any) => (dispatch: Dispatch) => {
  GetUsuarios(id_usuario).then((res) => {
    dispatch({
      type: GET_VACUNA_PACIENTE,
      payload: res.data,
    });
  });
};

export const setVP = (pv: Array<Vacuna_Paciente_Relacionado_INT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_VACUNA_PACIENTE,
    payload: pv,
  });
};
