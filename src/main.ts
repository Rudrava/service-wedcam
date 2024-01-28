import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 8080);
  console.log('----------------------');
  console.log('App listening on 8080');
  console.log('WEDCAM - is up');
  console.log('----------------------');
}
bootstrap();
