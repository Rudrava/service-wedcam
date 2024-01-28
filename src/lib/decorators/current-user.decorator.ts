import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/user/entities';

export const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    const user: User = request.user;
    if (!user) throw new Error('Guards not added.');
    return user;
  },
);
