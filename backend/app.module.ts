import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client")
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      // automatically generates a schema.gql file from type-graphql code
      autoSchemaFile: "schema.gql"
    }),
    UserModule
  ]
})
export class AppModule {}
