import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { AwsModule } from "../aws/aws.module";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { AwsModuleOptions } from "../aws/interfaces/aws-options.interface";

@Module({
  imports: [
    // import AWS module for S3 client
    AwsModule.configure({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): AwsModuleOptions => {
        return {
          bucketName: configService.awsS3BucketName,
          credentials: configService.awsS3Credentials,
          regionName: configService.awsS3RegionName
        };
      }
    }),
    // need config module for config values
    ConfigModule
  ],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
