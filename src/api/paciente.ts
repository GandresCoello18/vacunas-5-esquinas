import axios from "axios";
import { DOMAIN } from "../config/domain";

/// PETICION POST

export const CreatePaciente = async (paciente: FormData) => {
  console.log(paciente);
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/paciente`,
    data: paciente,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

////// PETICION GET

export const GetPacientes = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/paciente`,
  });
};
