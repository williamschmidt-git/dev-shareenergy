import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from 'src/middlewares/auth/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.validateUser(req.body);
  }
}
