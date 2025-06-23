import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './User/user.module';
import { AuthModule } from './Auth/auth.module';
import { LobbyModule } from './Lobby/lobby.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, LobbyModule],
})
export class AppModule {}
