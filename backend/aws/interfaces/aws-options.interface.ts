import { ModuleMetadata, Type } from "@nestjs/common/interfaces";

/**
 * Options required by the AWS module.
 */
export interface AwsModuleOptions {
  regionName: string; // e.g. "us-east-1"
  bucketName: string; // e.g. "my-bucket-name"
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

export interface AwsOptionsFactory {
  createAwsOptions(): Promise<AwsModuleOptions> | AwsModuleOptions;
}

export interface AwsModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  useExisting?: Type<AwsOptionsFactory>;
  useClass?: Type<AwsOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<AwsModuleOptions> | AwsModuleOptions;
  inject?: any[];
}
