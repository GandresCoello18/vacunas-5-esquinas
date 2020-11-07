import axios from "axios";
import { DOMAIN } from "../config/domain";

/// PETICION POST

export const loginUser = async (user: any) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/usuario`,
    data: user,
  });
};

////// PETICION GET

export const GetUsuarios = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/usuario`,
  });
};

export const GetSession = async (id_usuarios: string) => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/usuario/session/${id_usuarios}`,
  });
};
