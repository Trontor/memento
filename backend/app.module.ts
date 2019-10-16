import { Module, Logger } from "@nestjs/common";
import { GraphQLModule, GqlModuleOptions } from "@nestjs/graphql";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { FamilyModule } from "./family/family.module";
import { InviteModule } from "./invite/invite.module";
import { FileModule } from "./file/file.module";
import { UploadOptions } from "graphql-upload";
import { AwsModule } from "./aws/aws.module";
import { MementoModule } from "./memento/memento.module";
import { VisionModule } from "./vision/vision.module";
import {
  MailerModule,
  HandlebarsAdapter,
  MailerOptions,
} from "@nest-modules/mailer";

/**
 * Root module of the application.
 * Declares all the other modules the application will use.
 */
@Module({
  imports: [
    // serve static React files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", "client/build"),
    }),
    // run a graphql server at `/graphql`
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): GqlModuleOptions => {
        if (configService.isDevEnv)
          Logger.log(
            "In development mode: GraphQL Playground and debug traces started",
          );
        else Logger.log("In production: playground and debug traces disabled");

        const options: GqlModuleOptions = {
          // debug messages in responses
          debug: configService.isDevEnv,
          playground: configService.isDevEnv,
          // automatically generates a schema.gql file from type-graphql code
          autoSchemaFile: "schema.gql",
          // pass the Express request into the GraphQL resolvers
          // required for accessing `user` object for authentication / authorization
          context: ({ req }: { req: any }) => ({ req }),
        };
        // upload settings
        const uploads: UploadOptions = {
          maxFileSize: configService.graphQLMaxFileSize, // 10 MB
          maxFiles: configService.graphQLMaxFiles,
        };
        options.uploads = uploads;
        return options;
      },
    }),
    // set up mongoDB connection
    // async is needed due to dynamic module setup using ConfigModule
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MongooseModuleOptions => {
        const options: MongooseModuleOptions = {
          uri: configService.mongoUri,
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        };

        if (configService.mongoAuthEnabled) {
          options.user = configService.mongoUser;
          options.pass = configService.mongoPassword;
        }

        return options;
      },
    }),
    // setup mailer module
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MailerOptions => {
        const prodTemplatesDir: string = join(
          __dirname,
          "..",
          "..",
          "backend",
          "templates",
        );
        const devTemplatesDir: string = join(__dirname, "templates");

        const templatesDir: string = configService.isDevEnv
          ? devTemplatesDir
          : prodTemplatesDir;
        Logger.log("Using templates dir: " + templatesDir);
        return {
          transport: configService.emailSmtpUri,
          defaults: {
            from: configService.emailFrom,
          },
          template: {
            // templates are not found in `dist` dir as they are static, not TS
            dir: templatesDir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    UserModule,
    AuthModule,
    ConfigModule,
    FamilyModule,
    InviteModule,
    FileModule,
    AwsModule,
    MementoModule,
    VisionModule,
  ],
})
export class AppModule {}
