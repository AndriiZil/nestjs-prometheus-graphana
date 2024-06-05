import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricsService } from './metrics.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MetricsService],
})
export class AppModule {}
