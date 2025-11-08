import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { Repository } from 'typeorm';
import { OtpEntity } from '../users/entities/otp.entity';
import { UserEntity } from '../users/entities/user.entity';
import { SendOtpDto } from './dto/otp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,
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

    return otp;
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
}
