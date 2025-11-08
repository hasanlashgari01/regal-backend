import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SendOtpDto {
  @ApiProperty({ default: '' })
  @Matches(/^(\+98|0)?9\d{9}$/, { message: 'شماره موبایل باید صحیح نمی باشد' })
  @IsNotEmpty({ message: 'شماره موبایل الزامی است' })
  mobile: string;
}

export class CheckOtpDto {
  @ApiProperty({ default: '' })
  @Matches(/^(\+98|0)?9\d{9}$/, { message: 'شماره موبایل باید صحیح نمی باشد' })
  @IsString()
  @IsNotEmpty({ message: 'شماره موبایل الزامی است' })
  mobile: string;

  @ApiProperty({ minLength: 6, maxLength: 6, default: '' })
  @IsString()
  @IsNotEmpty({ message: 'کد الزامی است' })
  code: string;
}
