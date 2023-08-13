import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwtAuthentication.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(@Req() request: RequestWithUser) {
    request.res.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogout(),
    );
  }
}

export default AuthenticationController;
