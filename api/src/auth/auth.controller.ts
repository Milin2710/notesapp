import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() body: { username: string; email: string; password: string },
  ) {
    return this.authService.signup(body.username, body.email, body.password);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(body.email, body.password);

    response.cookie('auth-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return result;
  }

  @Get('me')
  async me(@Req() request: ExpressRequest) {
    const token = request.cookies?.['auth-token'];
    if (!token) {
      return null;
    }

    try {
      const user = await this.authService.verifyTokenAndGetUser(token);
      return user || null;
    } catch {
      return null;
    }
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth-token');
    return { message: 'Logged out' };
  }
}
