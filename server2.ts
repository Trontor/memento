import { NestFactory } from "@nestjs/core";
// AppModule is the root module of the application
import { AppModule } from "./backend/app.module";
import { Logger } from "@nestjs/common";

// An async function is needed due to `await` usage
async function bootstrap() {
  // Create a nest application
  const app = await NestFactory.create(AppModule, { cors: true });

  // Port to serve the express server on: production port or default (5000)
  const port = process.env.PORT || 5000;

  // Listen for routes on the specified port
  await app.listen(port);
  const host = `http://localhost:${port}`;
  Logger.log(`Express server initialised at ${host}`);
  Logger.log(`GraphQL server initialised at ${host}/graphql`);
}
bootstrap();
