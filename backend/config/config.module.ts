import { Module } from "@nestjs/common";
import { ConfigService } from "./config.service";

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: ConfigService.getInstance(),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
