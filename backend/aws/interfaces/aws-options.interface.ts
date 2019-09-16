import { ModuleMetadata, Type } from "@nestjs/common/interfaces";

export interface AwsModuleOptions {
  regionName: string;
  bucketName: string;
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
