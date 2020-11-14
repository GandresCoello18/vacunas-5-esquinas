import axios from "axios";
import { DOMAIN } from "../config/domain";
import { Peso_Altura_INT } from "../interface";

/// PETICION POST

export const CreateSeguimiento = async (PA: Peso_Altura_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/seguimiento`,
    data: PA,
  });
};

////// PETICION GET

export const GetSeguimineto = async (id_paciente: string) => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/seguimiento/${id_paciente}`,
  });
};
