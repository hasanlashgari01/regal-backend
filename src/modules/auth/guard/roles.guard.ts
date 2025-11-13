import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';
import { AuthMessage } from 'src/common/enums/message.enum';
import { TokenPayload } from '../types/token-payload.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);
    const httpContext = context.switchToHttp();
    const request: Request = httpContext.getRequest();
    const user = request.user as TokenPayload;
    if (requiredRoles && !requiredRoles.includes(user.role)) {
      throw new UnauthorizedException(AuthMessage.NotAccess);
    }

    return true;
  }
}
