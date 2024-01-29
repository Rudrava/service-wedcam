import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    name: 'firstName',
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    name: 'lastName',
  })
  @IsString()
  @IsOptional()
  lastName: string;
}
