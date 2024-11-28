import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API documentation for the NestJS project')
    .setVersion('1.0')
    .addTag('hauler-bill')  // Optional: Add a tag for specific modules if needed
    .addTag('service-location')  // Optional: Add a tag for specific modules if needed
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  // 'api' is the route where Swagger UI will be available

  await app.listen(3000);
}

bootstrap();
