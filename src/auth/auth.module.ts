import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from 'src/constaints/commom.constaint';
import { UserModule } from 'src/user/user.module';
import { LoggerModule } from '../logger/logger.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
    LoggerModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
