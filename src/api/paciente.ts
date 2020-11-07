import axios from "axios";
import { DOMAIN } from "../config/domain";
import { Paciente_INT } from "../interface";

/// PETICION POST

export const CreatePaciente = async (paciente: Paciente_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/paciente`,
    data: paciente,
  });
};

////// PETICION GET

export const GetPacientes = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/paciente`,
  });
};
