import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import tags from 'constants/swagger-tags';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setup swagger
  const config = new DocumentBuilder()
    .setTitle('WedCam Apis')
    .setDescription('This is the api docs for Wedcam')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  config.tags = Object.values(tags);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 8080);
  console.log('----------------------');
  console.log('App listening on 8080');
  console.log('WEDCAM - is up');
  console.log('----------------------');
}
bootstrap();
