import path from "path";
import { getConfig } from "../config/index.js";
import * as dotenv from "dotenv";
dotenv.config();

const { env, dbFileName } = getConfig();

const defaultOptions = {
  client: "sqlite3",
  connection: {
    filename: dbFileName,
  },

  useNullAsDefault: true,
  migrations: {
    directory: path.join(path.resolve(), "migrations"),
  },
};

const configs = {
  development: defaultOptions,
  staging: defaultOptions,
  production: defaultOptions,
};

if (configs[env] === undefined) {
  throw Error(`Missing configuration for environment: ${env}`);
}

export default configs;
