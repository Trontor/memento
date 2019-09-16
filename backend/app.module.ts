import { Module } from "@nestjs/common";
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
import {
  MailerModule,
  HandlebarsAdapter,
  MailerOptions
} from "@nest-modules/mailer";
import { FileModule } from "./file/file.module";
import { UploadOptions } from "graphql-upload";
import { AwsModule } from "./aws/aws.module";

/**
 * Root module of the application.
 * Declares all the other modules the application will use.
 */
@Module({
  imports: [
    // serve static React files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", "client/build")
    }),
    // upload custom scalar for GraphQL
    // Upload,
    // run a graphql server at `/graphql`
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): GqlModuleOptions => {
        const options: GqlModuleOptions = {
          // debug messages in responses
          debug: true,
          playground: true,
          // automatically generates a schema.gql file from type-graphql code
          autoSchemaFile: "schema.gql",
          // pass the Express request into the GraphQL resolvers
          // required for accessing `user` object for authentication / authorization
          context: ({ req }: { req: any }) => ({ req })
        };
        // upload settings
        const uploads: UploadOptions = {
          maxFileSize: configService.graphQLMaxFileSize, // 10 MB
          maxFiles: configService.graphQLMaxFiles
        };
        options.uploads = uploads;
        return options;
      }
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
          useUnifiedTopology: true
        };

        if (configService.mongoAuthEnabled) {
          options.user = configService.mongoUser;
          options.pass = configService.mongoPassword;
        }

        return options;
      }
    }),
    // setup mailer module
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MailerOptions => ({
        transport: configService.emailSmtpUri,
        defaults: {
          from: configService.emailFrom
        },
        template: {
          dir: __dirname + "/templates",
          adapter: new HandlebarsAdapter(), // or new PugAdapter()
          options: {
            strict: true
          }
        }
      })
    }),
    UserModule,
    AuthModule,
    ConfigModule,
    FamilyModule,
    InviteModule,
    FileModule,
    AwsModule
  ]
})
export class AppModule {}
