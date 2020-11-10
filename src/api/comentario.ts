import axios from "axios";
import { DOMAIN } from "../config/domain";

export const createComentario = async (
  comentario: string,
  id_usuario: string | undefined,
  id_discucion_mencion: string
) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/comentario`,
    data: {
      id_usuario,
      id_discucion_mencion,
      comentario,
    },
  });
};

export const getComentarioDiscucion = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/comentario`,
  });
};
