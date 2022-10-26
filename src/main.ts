import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const tokenKey = process.env['TOKEN_KEY'];
  console.log(tokenKey);
}
bootstrap();
