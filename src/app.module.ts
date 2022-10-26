import { Module } from '@nestjs/common';
import { TokenModule } from './token/token.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [TokenModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule { }
