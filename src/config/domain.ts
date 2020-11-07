import Cookies from "js-cookie";

export const DEVELOPMENT: string = "http://127.0.0.1:7000";
export const PRODUCTION: string = "https://api-seguro-social.herokuapp.com";
export const DOMAIN: string = DEVELOPMENT;
export const AUTH_USER: string | undefined = Cookies.get("id-user");
