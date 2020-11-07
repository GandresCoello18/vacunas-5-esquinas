import axios from "axios";
import { DOMAIN } from "../config/domain";
import { Representantes_INT } from "../interface";

/// PETICION POST

export const CreateRepresent = async (Represent: Representantes_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/representante`,
    data: Represent,
  });
};

////// PETICION GET

export const GetRepresentante = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/representante`,
  });
};
