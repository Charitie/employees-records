import knexStringCase from "knex-stringcase";
import  knex  from "knex";
import { getConfig } from "../config/index.js";
import configs from "./knexfile.js";

const config= (configs)[getConfig().env];

if (!config) {
  throw new Error("Missing database config");
}

export const knexInstance = knex(knexStringCase(config));
