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

//// PETICION DELETE

export const DeletePacientes = async (id_usuario: string) => {
  return await axios({
    method: "DELETE",
    url: `${DOMAIN}/api/paciente/${id_usuario}`,
  });
};

/// PETICION PUT

export const UpdatePacientes = async (
  id_usuario: string,
  nombres: string,
  apellidos: string,
  representante: number
) => {
  return await axios({
    method: "PUT",
    url: `${DOMAIN}/api/paciente/${id_usuario}`,
    data: {
      nombres,
      apellidos,
      representante,
    },
  });
};
