import { Dispatch } from "redux";
import { Vacunas_INT } from "../../interface";
import { GetVacunas } from "../../api/vacuna";

/// CONSTANTES

export interface initialData {
  Vacunas: Array<Vacunas_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  Vacunas: [],
  loading: true,
  error: "",
};

const GET_VACUNAS = "GET_VACUNAS";
const SET_VACUNAS = "SET_VACUNAS";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_VACUNAS:
      return { ...state, Vacunas: action.payload, loading: false };
    case SET_VACUNAS:
      return { ...state, Vacunas: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getVacunas = () => (dispatch: Dispatch) => {
  GetVacunas().then((res) => {
    dispatch({
      type: GET_VACUNAS,
      payload: res.data,
    });
  });
};

export const setVacunas = (vacunas: Array<Vacunas_INT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_VACUNAS,
    payload: vacunas,
  });
};
