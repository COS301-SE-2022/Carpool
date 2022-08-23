import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { WeatherResolver } from './weather-resolver.resolver';

@Module({
  imports: [CqrsModule],
  providers: [WeatherResolver],
  exports: [],
})
export class WeatherModule {}
