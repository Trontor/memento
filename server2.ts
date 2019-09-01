import { NestFactory } from "@nestjs/core";
import { AppModule } from "./backend/app.module";
// Helps us load .env files into memory (process.env.<property> = <value>)
import dotenv from "dotenv";
// Load .env file into memory
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow CORS
  app.enableCors();

  // Port to serve the express server on: production port or default (5000)
  const port = process.env.PORT || 5000;

  // Listen for routes on the specified port
  await app.listen(port);
  const host = `http://localhost:${port}`;
  console.log(`Express server initialised at ${host}`);
  console.log(`GraphQL server initialised at ${host}`);
}
bootstrap();
