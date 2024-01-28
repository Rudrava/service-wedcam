import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { baseConfig, dbConfig } from 'config';
import { validationSchema } from 'config/validator';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
