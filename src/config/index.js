import "dotenv/config";
import joi from "joi";

const envVariablesSchema = joi
  .object({
    NODE_ENV: joi.string().allow("development", "staging", "production").default("development").required(),
    PORT: joi.number().default(4000),
    DB_FILENAME: joi.string().required(),
  })
  .unknown()
  .required();

let config;
export const getConfig = () => {
  if (!config) {
    const { error, value: envVars } = envVariablesSchema.validate(process.env);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    config = {
      env: envVars.NODE_ENV,
      port: envVars.PORT,
      dbFileName: envVars.DB_FILENAME,
    };
  }

  return config;
};
