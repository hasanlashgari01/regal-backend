import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SizeEntity } from './entities/size.entity';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([SizeEntity])],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule {}
