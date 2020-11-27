import axios from "axios";
import { DOMAIN } from "../config/domain";

//// PETIOCION POST

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

///// PETICION GET

export const getComentarioDiscucion = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/comentario`,
  });
};

///// PETICION DELETE

export const DeleteComentarioDiscucion = async (id_comentario: string) => {
  return await axios({
    method: "DELETE",
    url: `${DOMAIN}/api/comentario/${id_comentario}`,
  });
};
