import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRE_AFTER || '12d',
  issuer: process.env.JWT_ISSUER,
}));
