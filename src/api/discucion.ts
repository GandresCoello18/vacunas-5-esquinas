import axios from "axios";
import { DOMAIN } from "../config/domain";
import { Discucion_INT } from "../interface";

export const createDiscucion = async (discucion: Discucion_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/discucion`,
    data: discucion,
  });
};

export const getDiscucion = async (fecha: string) => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/discucion/${fecha}`,
  });
};

export const getMisMenciones = async (id_paciente: string) => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/discucion/mis-menciones/${id_paciente}`,
  });
};
