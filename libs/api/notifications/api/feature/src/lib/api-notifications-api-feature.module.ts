import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthService } from '@carpool/api/authentication/service';
import { NotificationResolver } from './notifications-resolver.resolver';

@Module({
  providers: [AuthService, NotificationResolver],
  imports: [CqrsModule],
})
export class NotificationsModule {}
