import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const envFile = process.env.ENV_FILE || '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

// Swagger
 const config = new DocumentBuilder()
    .setTitle('Org Plus API')
    .setDescription('API docs for Org Plus')
    .setVersion('1.0')
    .addBearerAuth() // Important for JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

// 

  await app.listen(process.env.PORT ?? 3000);
 console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
