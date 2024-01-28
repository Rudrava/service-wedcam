import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description:
      'Email of the user should if new would create new account or else login',
  })
  email: string;
}
