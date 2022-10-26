import { NestFactory } from '@nestjs/core';
import AWS from 'aws-sdk';
import { AppModule } from './app.module';

async function bootstrap() {

  AWS.config.update({ region: 'us-east-2' });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
