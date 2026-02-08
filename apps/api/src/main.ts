import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_TAGS } from './constants/swagger.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(AppModule.name);

  // Global prefix for all routes
  app.setGlobalPrefix('api/v1');

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS
  app.enableCors();

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Dự án NestJS cho GachaDamn')
    .setDescription('Tài liệu API cho trang WIKI')
    .setVersion('1.0')
    .addTag(SWAGGER_TAGS.GENSHIN_WIKI, 'Các API cho trang Wiki của Genshin')
    .addTag(
      SWAGGER_TAGS.ENDFIELD_WIKI,
      'Các API cho trang Wiki của Arknights: Endfield',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 8000);
  logger.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT ?? 8000}/api`,
  );
  logger.log(
    `🚀 Access Swagger at: http://localhost:${process.env.PORT ?? 8000}/swagger`,
  );
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
