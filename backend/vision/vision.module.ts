import { Module, forwardRef } from "@nestjs/common";
import { VisionService } from "./vision.service";
import { AwsModule } from "../aws/aws.module";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { AwsModuleOptions } from "../aws/interfaces/aws-options.interface";
import { FamilyModule } from "../family/family.module";

@Module({
  imports: [
    AwsModule.configure({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): AwsModuleOptions => {
        return {
          bucketName: configService.awsS3BucketName,
          credentials: configService.awsS3Credentials,
          regionName: configService.awsS3RegionName,
        };
      },
    }),
    forwardRef(() => FamilyModule),
  ],
  providers: [VisionService],
  exports: [VisionService],
})
export class VisionModule {}
