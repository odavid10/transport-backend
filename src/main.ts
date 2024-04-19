import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

// third-party
import helmet from 'helmet';

// project imports
import { AppModule } from './app.module';
import * as App from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const enviroment = configService.get('NODE_ENV');

  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(
    helmet({
      xPoweredBy: false,
      xFrameOptions: { action: 'sameorigin' },
    }),
  );
  app.use(helmet.hidePoweredBy());

  //? Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      //? Permite solo un error por propiedad del DTO
      stopAtFirstError: false,

      //? Elimina los campos que no estan en el DTO
      whitelist: true,

      //? Lanza un error si se envia un campo que no esta en el DTO
      forbidNonWhitelisted: false,

      //?La validacion fallara por las propiedades que no estan en el DTO
      skipMissingProperties: false,

      //? Deshabilita los mensajes de error predeterminados
      disableErrorMessages: false,

      //? transforma los objetos JSON a objetos de tipo DTO
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle(`Transport App API - ${enviroment}`)
    .setDescription('Endpoints documentation for Vision API')
    .setVersion(App.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(configService.get<number>('port') || 4000);
}
bootstrap();
