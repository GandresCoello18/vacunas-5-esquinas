import axios from "axios";
import { DOMAIN } from "../config/domain";

//// PETICION POST

export const loginUser = async (user: any) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/usuario`,
    data: user,
  });
};

////// PETICION GET

export const GetUsuarios = async (id_usuarios: string) => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/usuario/${id_usuarios}`,
  });
};

export const GetSession = async (id_usuarios: string) => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/usuario/session/${id_usuarios}`,
  });
};

////// PETICION DELETE

export const DeleteUser = async (id_usuarios: string) => {
  return await axios({
    method: "DELETE",
    url: `${DOMAIN}/api/usuario/${id_usuarios}`,
  });
};

////// PETICION PUT

export const PutRolUser = async (id_usuarios: string) => {
  return await axios({
    method: "PUT",
    url: `${DOMAIN}/api/usuario/rol/${id_usuarios}`,
  });
};

export const PutStatusser = async (id_usuarios: string, status: string) => {
  return await axios({
    method: "PUT",
    url: `${DOMAIN}/api/usuario/status/${id_usuarios}`,
    data: {
      status,
    },
  });
};
