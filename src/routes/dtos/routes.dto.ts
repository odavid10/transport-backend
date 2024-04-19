import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
} from 'class-validator';

class LocationDto {
  @ApiProperty({ description: 'location name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'location latitude' })
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @ApiProperty({ description: 'location longitude' })
  @IsNotEmpty()
  @IsNumber()
  long: number;
}

export class CreateRouteDto {
  @ApiProperty({ description: 'route name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'route origin' })
  @IsNotEmpty()
  @IsObject()
  origin: LocationDto;

  @ApiProperty({ description: 'route destination' })
  @IsNotEmpty()
  @IsObject()
  destination: LocationDto;

  @ApiProperty({ description: 'route pricce' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'unit capacity' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  capacity: number;

  @ApiProperty({ description: 'init time' })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  departureTime: Date;

  @ApiProperty({ description: 'arrival time' })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  arrivalTime: Date;
}

export class UpdateRouteDto extends PartialType(CreateRouteDto) {}
