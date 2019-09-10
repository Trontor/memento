import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";
import * as fs from "fs";
import Joi from "@hapi/joi";

export interface EnvConfig {
  [key: string]: string;
}

/**
 * A Configuration service that reads from the supplied .env filepath
 * If none is provided, then use the "development.env" configuration file
 */
@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    let file: Buffer | undefined;
    try {
      file = fs.readFileSync(filePath);
    } catch (error) {
      file = fs.readFileSync("development.env");
    }

    const config = dotenv.parse(file);
    this.envConfig = this.validateInput(config);
  }

  /**
   * Validates the .env file.
   * @param envConfig Raw parsed .env file
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      MONGO_URI: Joi.string().required(),
      MONGO_AUTH_ENABLED: Joi.boolean().default(false),
      MONGO_USER: Joi.string().when("MONGO_AUTH_ENABLED", {
        is: true,
        then: Joi.required()
      }),
      MONGO_PASSWORD: Joi.string().when("MONGO_AUTH_ENABLED", {
        is: true,
        then: Joi.required()
      }),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRES_IN: Joi.number()
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema
    );
    if (error) {
      throw new Error(
        `Config validation error in your env file: ${error.message}`
      );
    }
    return validatedEnvConfig;
  }

  get jwtExpiresIn(): number | undefined {
    if (this.envConfig.JWT_EXPIRES_IN) {
      return +this.envConfig.JWT_EXPIRES_IN;
    }
    return undefined;
  }

  get mongoUri(): string {
    return this.envConfig.MONGO_URI;
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }

  get mongoUser(): string | undefined {
    return this.envConfig.MONGO_USER;
  }

  get mongoPassword(): string | undefined {
    return this.envConfig.MONGO_PASSWORD;
  }

  get emailEnabled(): boolean {
    return Boolean(this.envConfig.EMAIL_ENABLED).valueOf();
  }

  get mongoAuthEnabled(): boolean {
    return Boolean(this.envConfig.MONGO_AUTH_ENABLED).valueOf();
  }
}
