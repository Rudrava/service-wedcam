import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { baseConfig, dbConfig } from 'config';
import { validationSchema } from 'config/validator';
import { DatabaseModule } from './db.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [baseConfig, dbConfig],
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
