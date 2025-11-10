import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { Request } from 'express';
import { Authorization } from 'src/common/decorators/auth.decorator';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { CheckOtpDto, SendOtpDto } from './dto/otp.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('check-otp')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  checkOtp(@Body() checkOtpDto: CheckOtpDto) {
    return this.authService.checkOtp(checkOtpDto);
  }

  @Get('me')
  @Authorization()
  getMe(@Req() req: Request) {
    return req.user;
  }
}
