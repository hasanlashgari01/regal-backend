import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { AuthMessage, NotFoundMessage } from 'src/common/enums/message.enum';
import { OtpEntity } from 'src/modules/users/entities/otp.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CheckOtpDto, SendOtpDto } from '../dto/otp.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(OtpEntity) private otpRepository: Repository<OtpEntity>,
    private tokenService: TokenService,
  ) {}

  async sendOtp(sendOtpDto: SendOtpDto) {
    const { mobile } = sendOtpDto;

    let user = await this.userRepository.findOneBy({ mobile });
    let otp: OtpEntity | null = null;

    if (user) {
      otp = await this.generateOtp(user?.id);
    } else {
      user = this.userRepository.create({ mobile });
      await this.userRepository.save(user);
      otp = await this.generateOtp(user?.id);
    }

    return {
      message: AuthMessage.SentCode,
      code: otp.code,
    };
  }

  async checkOtp(checkOtpDto: CheckOtpDto) {
    const { mobile, code } = checkOtpDto;

    const user = await this.userRepository.findOneBy({ mobile });
    if (!user) throw new NotFoundException(NotFoundMessage.User);
    await this.validateOtp(user.id, code);

    const payload = {
      sub: user.id,
      mobile: user.mobile,
      role: user.role,
    };
    const accessToken = this.tokenService.createAccessToken(payload);
    const refreshToken = this.tokenService.createRefreshToken(payload);

    if (!user.verifyMobile) {
      user.verifyMobile = true;
      await this.userRepository.save(user);
    }

    return {
      message: AuthMessage.LoggedIn,
      accessToken,
      refreshToken,
    };
  }

  getMe() {
    return 'me';
  }

  private async generateOtp(userId: number): Promise<OtpEntity> {
    const code = randomInt(100000, 999999).toString();
    const expiresIn = new Date(Date.now() + 1000 * 60 * 2);
    let otp = await this.otpRepository.findOneBy({ userId });
    let existOtp = false;

    if (otp) {
      existOtp = true;
      otp.code = code;
      otp.expiresIn = expiresIn;
      otp.isUsed = false;
    } else {
      otp = this.otpRepository.create({
        code,
        expiresIn,
        userId,
        isUsed: true,
      });
    }

    otp = await this.otpRepository.save(otp);
    if (!existOtp) {
      await this.userRepository.update({ id: userId }, { otpId: otp?.id });
    }

    return otp;
  }

  private async validateOtp(userId: number, code: string) {
    const otp = await this.otpRepository.findOneBy({ userId });
    if (!otp) throw new UnauthorizedException(AuthMessage.TryAgain);
    if (otp.isUsed) throw new UnauthorizedException(AuthMessage.UsedCode);
    if (otp.expiresIn < new Date()) throw new UnauthorizedException(AuthMessage.ExpiresCode);
    if (otp.code !== code) throw new UnauthorizedException(AuthMessage.TryAgain);

    await this.otpRepository.update({ id: otp.id }, { isUsed: true });

    return otp;
  }
}
