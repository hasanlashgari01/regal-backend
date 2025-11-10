import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { SKIP_AUTH } from 'src/common/decorators/skip-auth.decorator';
import { extractToken } from 'src/common/utils/extract-token.utils';
import { TokenService } from 'src/modules/auth/services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isSkippedAuthorization = this.reflector.get<boolean>(SKIP_AUTH, context.getHandler());
    if (isSkippedAuthorization) return true;
    const request: Request = context.switchToHttp().getRequest();
    const token = extractToken(request);
    request.user = await this.tokenService.verifyAccessToken(token);

    return true;
  }
}
