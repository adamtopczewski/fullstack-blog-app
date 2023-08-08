import { Module } from '@nestjs/common';
import UsersService from 'src/users/user.service';
import AuthenticationService from './authentication.service';
import AuthenticationController from './authentication.controller';
import LocalStrategy from './local.strategy';

@Module({
  imports: [UsersService],
  providers: [AuthenticationService, LocalStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
