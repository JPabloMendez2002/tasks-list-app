import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { REST_API_LOCAL } = getEnvVariables();

const localAPI = axios.create({
  baseURL: REST_API_LOCAL,
});

export { localAPI };
