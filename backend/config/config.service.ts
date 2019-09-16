import { Injectable, Logger } from "@nestjs/common";
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
  private readonly logger = new Logger(ConfigService.name);
  private readonly envConfig: EnvConfig = {};

  constructor(filePath: string = "") {
    let file: Buffer | undefined;
    let config = null;
    // Check if a file path has been passed as a parameter
    if (filePath) {
      try {
        file = fs.readFileSync(filePath);
        config = dotenv.parse(file);
        console.log("Successfully read config from " + filePath);
      } catch (error) {
        console.log("Error reading config from " + filePath);
      }
    } else {
      // Otherwise, just parse from .env
      console.log("Loading config from .env file");
      dotenv.config();
      config = {
        MONGO_URI: process.env.MONGO_URI,
        MONGO_AUTH_ENABLED: process.env.MONGO_AUTH_ENABLED,
        MONGO_USER: process.env.MONGO_USER,
        MONGO_PASSWORD: process.env.MONGO_PASSWORD,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
        EMAIL_ENABLED: process.env.EMAIL_ENABLED,
        EMAIL_HOSTNAME: process.env.EMAIL_HOSTNAME,
        EMAIL_PORT: process.env.EMAIL_PORT,
        EMAIL_USERNAME: process.env.EMAIL_USERNAME,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
        EMAIL_FROM: process.env.EMAIL_FROM,
        HOST_NAME: process.env.HOST_NAME
      } as EnvConfig;
      console.log("Config: ", config);
    }
    if (config) this.envConfig = this.validateInput(config);
  }

  /**
   * Validates the .env file
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
      JWT_EXPIRES_IN: Joi.number(),
      EMAIL_ENABLED: Joi.boolean().default(false),
      EMAIL_HOSTNAME: Joi.string().when("EMAIL_ENABLED", {
        is: true,
        then: Joi.required()
      }),
      EMAIL_PORT: Joi.number(),
      EMAIL_USERNAME: Joi.string().when("EMAIL_ENABLED", {
        is: true,
        then: Joi.required()
      }),
      EMAIL_PASSWORD: Joi.string().when("EMAIL_ENABLED", {
        is: true,
        then: Joi.required()
      }),
      EMAIL_FROM: Joi.string().when("EMAIL_ENABLED", {
        is: true,
        then: Joi.required()
      }),
      TEST_EMAIL_TO: Joi.string(),
      HOST_NAME: Joi.string()
        .hostname()
        .required(),
      GRAPHQL_MAX_FILE_SIZE: Joi.number().required(),
      GRAPHQL_MAX_FILES: Joi.number().required(),
      AWS_S3_ACCESS_KEY_ID: Joi.string().required(),
      AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
      AWS_S3_REGION_NAME: Joi.string().required(),
      AWS_S3_BUCKET_NAME: Joi.string().required(),
      CDN_HOSTNAME: Joi.string()
        .hostname()
        .required()
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

  get emailFrom(): string {
    return this.envConfig.EMAIL_FROM;
  }

  get testEmailTo(): string {
    return this.envConfig.TEST_EMAIL_TO;
  }

  get emailSmtpUri(): string {
    const {
      EMAIL_USERNAME,
      EMAIL_PASSWORD,
      EMAIL_HOSTNAME,
      EMAIL_PORT
    } = this.envConfig;
    const protocol = parseInt(EMAIL_PORT) === 465 ? "smtps" : "smtp";
    const uri = `${protocol}://${EMAIL_USERNAME}:${EMAIL_PASSWORD}@${EMAIL_HOSTNAME}:${EMAIL_PORT}`;
    this.logger.log(uri);
    return uri;
  }

  get mongoAuthEnabled(): boolean {
    return Boolean(this.envConfig.MONGO_AUTH_ENABLED).valueOf();
  }

  get hostName(): string {
    return this.envConfig.HOST_NAME;
  }

  get graphQLMaxFileSize(): number {
    return Number(this.envConfig.GRAPHQL_MAX_FILE_SIZE).valueOf();
  }

  get graphQLMaxFiles(): number {
    return Number(this.envConfig.GRAPHQL_MAX_FILE_SIZE).valueOf();
  }

  get awsS3RegionName(): string {
    return this.envConfig.AWS_S3_REGION_NAME;
  }

  get awsS3Credentials() {
    return {
      accessKeyId: this.envConfig.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: this.envConfig.AWS_S3_SECRET_ACCESS_KEY
    };
  }

  get awsS3BucketName(): string {
    return this.envConfig.AWS_S3_BUCKET_NAME;
  }

  get cdnHostName(): string {
    return this.envConfig.CDN_HOSTNAME;
  }
}
