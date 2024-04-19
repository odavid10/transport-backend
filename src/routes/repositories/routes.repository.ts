import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// third-party
import { Model } from 'mongoose';

// project imports
import { Route } from '../schemas/route.schema';
import { statusEnum } from 'src/shared/enum/status.enum';
import { CreateRouteDto, UpdateRouteDto } from '../dtos/routes.dto';

export class RoutesRepository {
  constructor(@InjectModel(Route.name) private routeModel: Model<Route>) {}

  getAll(): Promise<Route[]> {
    return this.routeModel
      .find({ status: { $in: [statusEnum.active, statusEnum.inactive] } })
      .select(
        'status name origin destination price capacity departureTime arrivalTime',
      )
      .exec();
  }

  async getRouteById(id: string) {
    try {
      const route = await this.routeModel
        .findOne({
          _id: id,
          status: { $in: [statusEnum.active, statusEnum.inactive] },
        })
        .select(
          'status name origin destination price capacity departureTime arrivalTime',
        );

      return route;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error in database has been occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  create(payload: CreateRouteDto): Promise<Route> {
    const {
      name,
      price,
      capacity,
      departureTime,
      arrivalTime,
      origin,
      destination,
    } = payload;

    try {
      const newRoute = new this.routeModel({
        status: statusEnum.active,
        name,
        price,
        capacity,
        departureTime,
        arrivalTime,
        origin,
        destination,
      });

      return newRoute.save();
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, payload: UpdateRouteDto) {
    const route = await this.routeModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .select(
        'status name origin destination price capacity departureTime arrivalTime',
      )
      .exec();

    if (!route) {
      throw new NotFoundException(`Route ${id} not found`);
    }

    return route;
  }

  async disable(id: string) {
    const route = await this.routeModel
      .findByIdAndUpdate(
        id,
        { $set: { status: statusEnum.inactive } },
        { new: true },
      )
      .exec();
    if (!route) {
      throw new NotFoundException(`Route ${id} not found`);
    }

    return route;
  }

  async remove(id: string) {
    const route = await this.routeModel
      .findByIdAndUpdate(
        id,
        { $set: { status: statusEnum.deleted } },
        { new: true },
      )
      .exec();

    if (!route) {
      throw new NotFoundException(`Route ${id} not found`);
    }

    return route;
  }
}
