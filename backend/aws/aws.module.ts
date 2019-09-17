import { Module, Type } from "@nestjs/common";
import { DynamicModule, Provider } from "@nestjs/common/interfaces/modules";
import * as AWS from "aws-sdk";
import {
  AwsModuleAsyncOptions,
  AwsOptionsFactory,
  AwsModuleOptions
} from "./interfaces/aws-options.interface";
import { S3Client } from "./aws.s3.client";
import { AWS_MODULE_OPTIONS } from "./aws.constants";

/**
 * Module for AWS services, such as S3.
 */
@Module({})
export class AwsModule {
  public static configure(options: AwsModuleAsyncOptions): DynamicModule {
    // convert options into Providers
    const asyncProviders = this.createAsyncProviders(options);

    // configure the S3Client as a Provider using custom options
    const S3ClientProvider = {
      provide: S3Client,
      useFactory: (awsModuleOptions: AwsModuleOptions): S3Client => {
        const { regionName, bucketName, credentials } = awsModuleOptions;
        // TODO: surely this is a bad place to put AWS configuration?
        AWS.config.update({ credentials });
        return new S3Client(regionName, bucketName);
      },
      // injects the option module
      inject: [AWS_MODULE_OPTIONS]
    };
    return {
      module: AwsModule,
      imports: options.imports,
      // option providers are in `asyncProviders`
      // allows `S3ClientProvider` to access it in `useFactory()`
      providers: [...asyncProviders, S3ClientProvider],
      exports: [S3ClientProvider]
    };
  }

  /**
   * Creates arbitrary providers.
   * @param options options for configuring the AwsModule
   */
  private static createAsyncProviders(
    options: AwsModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<AwsOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass
      }
    ];
  }

  /**
   * Creates arbitrary options providers.
   * @param options options for configuring the AwsModule
   */
  private static createAsyncOptionsProvider(
    options: AwsModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      // creates and returns the options as a Module
      return {
        provide: AWS_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    // `as Type<AwsOptionsFactory>` is a workaround for microsoft/TypeScript#31603
    const inject = [
      (options.useClass || options.useExisting) as Type<AwsOptionsFactory>
    ];
    return {
      provide: AWS_MODULE_OPTIONS,
      useFactory: async (optionsFactory: AwsOptionsFactory) =>
        await optionsFactory.createAwsOptions(),
      inject
    };
  }
}
