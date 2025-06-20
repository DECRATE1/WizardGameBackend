import { Module } from '@nestjs/common';
import { AuthServise } from './auth.servise';

import { UserModule } from 'src/User/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './strategy/accessToken.strategy';
import { RefreshTokenStrategy } from './strategy/refreshToken.straregy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'SUPER_SECRET',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  providers: [AuthServise, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthServise],
})
export class AuthModule {}
