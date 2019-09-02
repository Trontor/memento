import { Module } from "@nestjs/common";
import { GraphQLModule, GqlModuleOptions } from "@nestjs/graphql";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";

/**
 * Root module of the application.
 * Declares all the other modules the application will use.
 */
@Module({
  imports: [
    // serve static React files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client")
    }),
    // run a graphql server at `/graphql`
    GraphQLModule.forRoot({
      // debug messages in responses
      debug: true,
      playground: true,
      // automatically generates a schema.gql file from type-graphql code
      autoSchemaFile: "schema.gql",
      // pass the Express request into the GraphQL resolvers
      // required for accessing `user` object for authentication / authorization
      context: ({ req }) => ({ req })
    }),
    // set up mongoDB connection
    // async is needed due to dynamic module setup using ConfigModule
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri: configService.mongoUri,
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false
        };

        if (configService.mongoAuthEnabled) {
          options.user = configService.mongoUser;
          options.pass = configService.mongoPassword;
        }

        return options;
      },
      inject: [ConfigService]
    }),
    UserModule,
    AuthModule,
    ConfigModule
  ]
})
export class AppModule {}
