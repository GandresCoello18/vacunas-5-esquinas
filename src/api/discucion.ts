import axios from "axios";
import { DOMAIN } from "../config/domain";
import { fecha_actual } from "../hooks/fecha";
import { Discucion_INT } from "../interface";

///// PETICION POST

export const createDiscucion = async (discucion: Discucion_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/discucion`,
    data: discucion,
  });
};

///// PETICION GET

export const getDiscucion = async (fecha: string) => {
  console.log(fecha);
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/discucion/${fecha ? fecha : fecha_actual()}`,
  });
};

export const getMisMenciones = async (id_paciente: string) => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/discucion/mis-menciones/${id_paciente}`,
  });
};

///// PETICION DELETE

export const EliminarMencion = async (id_discucion: string) => {
  return await axios({
    method: "DELETE",
    url: `${DOMAIN}/api/discucion/${id_discucion}`,
  });
};
