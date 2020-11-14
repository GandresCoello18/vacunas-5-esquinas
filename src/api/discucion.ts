import axios from "axios";
import { DOMAIN } from "../config/domain";
import { fecha_actual } from "../hooks/fecha";
import { Discucion_INT } from "../interface";

export const createDiscucion = async (discucion: Discucion_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/discucion`,
    data: discucion,
  });
};

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
