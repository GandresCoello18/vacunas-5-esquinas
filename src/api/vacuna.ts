import axios from "axios";
import { DOMAIN } from "../config/domain";

////// PETICION GET

export const GetVacunas = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/vacuna`,
  });
};
