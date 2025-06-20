import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './User/user.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule],
})
export class AppModule {}
