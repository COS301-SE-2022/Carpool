import { Module } from '@nestjs/common';
import { ApiShellFeatureModule } from '@carpool/api/shell';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ApiShellFeatureModule, ConfigModule.forRoot()],
})
export class AppModule {}
