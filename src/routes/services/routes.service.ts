import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

// project imports
import config from 'src/configuration/config';
import { RoutesRepository } from '../repositories/routes.repository';
import { CreateRouteDto, UpdateRouteDto } from '../dtos/routes.dto';

@Injectable()
export class RoutesService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly routeRepository: RoutesRepository,
  ) {}

  async getRouteById(id: string) {
    const route = await this.routeRepository.getRouteById(id);

    if (!route) {
      throw new BadRequestException('Route Not Found');
    }

    return route;
  }

  async getAllRoutes() {
    const routes = await this.routeRepository.getAll();

    return {
      routes,
    };
  }

  async create(payload: CreateRouteDto) {
    try {
      const routeCreated = await this.routeRepository.create(payload);

      if (!routeCreated) {
        throw new BadRequestException(`Already exist a route with that name`);
      }

      return { status: 'Route created successfully' };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Already exist a route with that name`);
      }
    }
  }

  async update(id: string, payload: UpdateRouteDto) {
    try {
      const routeUpdated = await this.routeRepository.update(id, payload);

      if (!routeUpdated) {
        throw new BadRequestException(`Could not update the route`);
      }

      return { status: 'Route updated successfully', route: routeUpdated };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Could not update the route`);
      }
    }
  }

  async disable(id: string) {
    const routeDisabled = await this.routeRepository.disable(id);

    if (routeDisabled) {
      return {
        status: 'Route disabled successfully',
        route: routeDisabled.name,
      };
    }
  }

  async deleteRoute(id: string) {
    const routeDeleted = await this.routeRepository.remove(id);

    if (routeDeleted) {
      return { status: 'Route deleted successfully', route: routeDeleted.name };
    }
  }
}
