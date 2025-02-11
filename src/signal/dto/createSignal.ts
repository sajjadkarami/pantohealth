/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNumber,
  IsObject,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class DataDetails {
  @ApiProperty({ example: 50, description: 'Speed of the device', minimum: 0 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  speed: number;

  @ApiProperty({ example: 60, description: 'X Coordinate' })
  @IsInt()
  @Type(() => Number)
  XCoordination: number;

  @ApiProperty({ example: 80, description: 'Y Coordinate' })
  @IsInt()
  @Type(() => Number)
  YCoordination: number;
}
class DataPoint {
  @ApiProperty({
    example: '2025-02-11T09:48:38.489Z',
    description: 'Timestamp of the data point',
  })
  @IsNumber()
  @Type(() => Number)
  time: number;

  @ApiProperty({ description: 'Data details including speed and coordinates' })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => DataDetails)
  data: DataDetails;
}

export class CreateSignalDto {
  @ApiProperty({
    example: 'device1',
    description: 'Unique identifier for the device',
  })
  @IsString()
  deviceId: string;

  @ApiProperty({
    example: '2025-02-11T09:48:38.489Z',
    description: 'Overall timestamp of the data payload',
  })
  @Type(() => Date)
  @IsDate()
  time: Date;

  @ApiProperty({ type: [DataPoint], description: 'Array of data points' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataPoint)
  data: DataPoint[];
}
