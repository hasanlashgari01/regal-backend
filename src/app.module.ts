import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConfig from './config/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MaterialModule } from './modules/material/material.module';
import { ColorModule } from './modules/color/color.module';
import { DesignModule } from './modules/design/design.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    MaterialModule,
    ColorModule,
    DesignModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
