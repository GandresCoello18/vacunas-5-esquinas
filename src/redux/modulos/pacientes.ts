import { Dispatch } from "redux";
import { Paciente_INT } from "../../interface";
import { GetPacientes } from "../../api/paciente";

/// CONSTANTES

export interface initialData {
  Pacientes: Array<Paciente_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  Pacientes: [],
  loading: true,
  error: "",
};

const GET_PACIENTES = "GET_PACIENTES";
const SET_PACIENTES = "SET_PACIENTES";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_PACIENTES:
      return { ...state, Pacientes: action.payload, loading: false };
    case SET_PACIENTES:
      return { ...state, Pacientes: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getPacientes = () => (dispatch: Dispatch) => {
  GetPacientes().then((res) => {
    dispatch({
      type: GET_PACIENTES,
      payload: res.data,
    });
  });
};

export const setRepresentante = (paciente: any) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_PACIENTES,
    payload: paciente,
  });
};
