import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { baseConfig, dbConfig, jwtConfig } from 'config';
import { validationSchema } from 'config/validator';
import { DatabaseModule } from './db.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [baseConfig, dbConfig, jwtConfig],
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    EventModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
