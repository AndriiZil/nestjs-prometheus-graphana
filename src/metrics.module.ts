import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Registry } from 'prom-client';

@Module({
  providers: [MetricsService, { provide: Registry, useValue: new Registry() }],
  controllers: [],
  exports: [MetricsService],
})
export class MetricsModule {}
