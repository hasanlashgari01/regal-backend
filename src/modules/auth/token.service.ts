import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, JwtService, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { AuthMessage } from 'src/common/enums/message.enum';
import { AccessTokenPayload, RefreshTokenPayload } from './types/token-payload.type';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  createAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '1h',
    });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(AuthMessage.LoginAgain);
      }

      if (error instanceof JsonWebTokenError || error instanceof NotBeforeError) {
        throw new UnauthorizedException('Invalid token');
      }

      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }
  }

  createRefreshToken(payload: RefreshTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '10d',
    });
  }

  verifyRefreshToken(token: string): AccessTokenPayload {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(AuthMessage.LoginAgain);
      }

      if (error instanceof JsonWebTokenError || error instanceof NotBeforeError) {
        throw new UnauthorizedException('Invalid token');
      }

      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }
  }
}
