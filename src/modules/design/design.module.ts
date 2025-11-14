import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DesignController } from './design.controller';
import { DesignService } from './design.service';
import { DesignEntity } from './entities/design.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([DesignEntity])],
  controllers: [DesignController],
  providers: [DesignService],
})
export class DesignModule {}
