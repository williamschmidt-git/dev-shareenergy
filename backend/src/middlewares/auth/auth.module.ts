import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FindUserByUsername } from 'src/app/use-cases/user/find-user-by-username';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthController } from 'src/infra/http/controllers/auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.auth.service';

@Module({
  imports: [PassportModule, JwtModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, FindUserByUsername, LocalStrategy],
})
export class AuthModule {}
