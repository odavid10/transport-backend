import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// project imports
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import config from './configuration/config';
import { MongoClient } from './shared/persistence/MongoCliente';
import { environments } from './configuration/environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    //? Base de datos
    MongoClient.create(),

    //? Shared module
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
