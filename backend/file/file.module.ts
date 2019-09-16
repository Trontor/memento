import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { AwsModule } from "../aws/aws.module";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { AwsModuleOptions } from "../aws/interfaces/aws-options.interface";

@Module({
  imports: [
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
    ConfigModule
  ],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
