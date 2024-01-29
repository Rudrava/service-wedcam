import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  venue: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  estimatedParticipants: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  startAt: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  endAt: number;
}
