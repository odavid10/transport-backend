import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// project imports
import { RoutesService } from '../services/routes.service';
import { CreateRouteDto, UpdateRouteDto } from '../dtos/routes.dto';
import { EApiTags } from 'src/shared/enum/shared-swagger-tags.enum';
import { ERoutes } from 'src/shared/enum/shared-routes.enum';

@ApiTags(EApiTags.route)
@Controller(ERoutes.route)
export class RoutesController {
  constructor(private routesService: RoutesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.routesService.getAllRoutes();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProfile(@Param('id') id: string) {
    return this.routesService.getRouteById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() payload: CreateRouteDto) {
    return this.routesService.create(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateRouteDto) {
    return this.routesService.update(id, payload);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/disable/:id')
  disable(@Param('id') id: string) {
    return this.routesService.disable(id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteRoute(@Param('id') id: string) {
    return this.routesService.deleteRoute(id);
  }
}
