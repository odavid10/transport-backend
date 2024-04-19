import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// project imports
import config from 'src/configuration/config';

export class MongoClient {
  static create() {
    return MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => ({
        uri: configService.mongo.dbURI,
        dbName: configService.mongo.dbName,
      }),
      inject: [config.KEY],
    });
  }
}
