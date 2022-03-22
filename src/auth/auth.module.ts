import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'kien',
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
