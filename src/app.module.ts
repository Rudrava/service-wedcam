import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt';
import { EventModule } from './event/event.module';
import { AssetModule } from './asset/asset.module';
import {
  baseConfig,
  dbConfig,
  jwtConfig,
  validationSchema,
  firebaseConfig,
} from './features/config';
import { clients } from './features/clients';
import { services } from './features/services';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [baseConfig, dbConfig, jwtConfig, firebaseConfig],
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    EventModule,
    AssetModule,
  ],
  controllers: [],
  providers: [
    ...clients,
    ...services,
    JwtStrategy,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
