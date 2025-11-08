import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class SendOtpDto {
  @ApiProperty({ default: '' })
  @Matches(/^(\+98|0)?9\d{9}$/, { message: 'شماره موبایل باید صحیح نمی باشد' })
  @IsNotEmpty({ message: 'شماره موبایل الزامی است' })
  mobile: string;
}
