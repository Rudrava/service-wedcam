import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { baseConfig, dbConfig } from 'config';
import { validationSchema } from 'config/validator';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './db.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
