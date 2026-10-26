import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { config } from './config';
import * as cors from 'cors';
import { TransformInterceptor } from './interceptors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { CustomLogger } from './services/customLogger';
import { morganMiddleware } from './interceptors/morgon-middleware';

async function bootstrap() {
  const logger = new Logger(config.SERVICE_NAME);
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(), // Use the custom logger
  });
  app.use(morganMiddleware); // Use Morgan middleware
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.startAllMicroservices();
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(cors());
  app.use(compression());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('You Glow API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.PORT, () =>
    logger.verbose(`App started on port: ${config.PORT}`),
  );
}
bootstrap();
