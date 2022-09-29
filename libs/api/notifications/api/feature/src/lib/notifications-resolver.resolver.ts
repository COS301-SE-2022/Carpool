import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Notification } from '@carpool/api/trips/entities';
import { AuthService } from '@carpool/api/authentication/service';
import { User } from '@carpool/api/authentication/entities';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly authService: AuthService) {}

  @ResolveField(() => User)
  async user(@Root() notification: Notification): Promise<User> {
    return await this.authService.findUserById(notification.userId);
  }
}
