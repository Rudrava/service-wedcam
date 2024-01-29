import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    name: 'email',
    description:
      'Email of the user should if new would create new account or else login',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

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
