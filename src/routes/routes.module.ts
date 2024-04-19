import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// project imports
import { RoutesService } from './services/routes.service';
import { RoutesController } from './controllers/routes.controller';
import { Route, RouteSchema } from './schemas/route.schema';
import { RoutesRepository } from './repositories/routes.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Route.name,
        schema: RouteSchema,
      },
    ]),
  ],
  providers: [RoutesRepository, RoutesService],
  controllers: [RoutesController],
})
export class RoutesModule {}
