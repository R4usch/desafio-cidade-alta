import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { RequireLogin } from '../decorators/requirelogin.decorator';
import { UsersServices } from 'src/database/services/users.services';
import { User } from 'src/database/entity/users.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UsersServices,
  ) {}

  hasPermissions(user: User, context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (roles) {
      for (const role of roles) {
        if (role == user.role) {
          return true;
        }
      }
    } else return true;
    return false;
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const requireLogin = this.reflector.get(RequireLogin, context.getHandler());
    if (requireLogin) {
      let user: User;
      if (request.headers.authorization) {
        // TO DO : Fazer um sistema de Cache

        user = await this.userService.getUserByAuthorizationCode(
          request.headers.authorization.split(' ')[1],
        );
        if (user == null) throw new UnauthorizedException();
        request.user = user;
      } else throw new UnauthorizedException();

      if (!this.hasPermissions(user, context))
        throw new UnauthorizedException();
    }

    return true;
  }
}
