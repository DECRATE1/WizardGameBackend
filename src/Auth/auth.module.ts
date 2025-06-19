import { Module } from '@nestjs/common';
import { AuthServise } from './auth.servise';

import { UserModule } from 'src/User/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'SUPER_SECRET',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthServise],
  controllers: [AuthController],
  exports: [AuthServise],
})
export class AuthModule {}
