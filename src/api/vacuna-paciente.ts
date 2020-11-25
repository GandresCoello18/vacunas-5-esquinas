import axios from "axios";
import { DOMAIN } from "../config/domain";
import { Vacuna_Paciente_INT } from "../interface";

/// PETICION POST

export const RegisterVacunaPaciente = async (pv: Vacuna_Paciente_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/vacuna-paciente`,
    data: pv,
  });
};

////// PETICION GET

export const GetPacienteVacuna = async (id_usuarios: string) => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/vacuna-paciente/${id_usuarios}`,
  });
};

export const GetCountPacienteVacuna = async (
  id_usuarios: string,
  id_vacuna: number
) => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/vacuna-paciente/${id_usuarios}/${id_vacuna}`,
  });
};
