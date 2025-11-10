import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, JwtService, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { AuthMessage } from 'src/common/enums/message.enum';
import { TokenPayload } from '../types/token-payload.type';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  createAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  async verifyAccessToken(token: string): Promise<TokenPayload> {
    try {
      const payload = this.jwtService.verify<TokenPayload>(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      if (typeof payload === 'object' && payload.sub) {
        const user = await this.usersService.findOneById(payload.sub);
        if (!user) throw new UnauthorizedException(AuthMessage.LoginRequired);

        return {
          sub: user.id,
          mobile: user.mobile,
          role: user.role,
        };
      }
      throw new UnauthorizedException(AuthMessage.LoginRequired);
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(AuthMessage.LoginRequired);
      }

      if (error instanceof JsonWebTokenError || error instanceof NotBeforeError) {
        throw new UnauthorizedException('Invalid token');
      }

      throw new UnauthorizedException(AuthMessage.LoginRequired);
    }
  }

  createRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  verifyRefreshToken(token: string): TokenPayload {
    try {
      return this.jwtService.verify<TokenPayload>(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(AuthMessage.LoginRequired);
      }

      if (error instanceof JsonWebTokenError || error instanceof NotBeforeError) {
        throw new UnauthorizedException('Invalid token');
      }

      throw new UnauthorizedException(AuthMessage.LoginRequired);
    }
  }
}
