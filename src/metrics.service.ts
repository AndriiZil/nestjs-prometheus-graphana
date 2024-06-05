import { Injectable } from '@nestjs/common';
import { Counter, Registry, collectDefaultMetrics } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly requestCounter: Counter<string>;

  constructor(private readonly register: Registry) {
    // Clear the registry to avoid duplicate metrics in tests or multiple instances
    this.register.clear();

    // Set default labels for all metrics
    this.register.setDefaultLabels({
      app: 'nestjs-app',
    });

    // Register default metrics
    collectDefaultMetrics({ register: this.register });

    // Define and register the custom counter metric
    this.requestCounter = new Counter({
      name: 'nestjs_requests_total',
      help: 'Total number of requests to the NestJS app',
      registers: [this.register], // Associate with the provided register
    });
  }

  // Method to increment the request counter
  public incrementRequestCounter(): void {
    this.requestCounter.inc();
  }

  // Method to get the current metrics
  public async getMetrics(): Promise<string> {
    return await this.register.metrics();
  }
}
