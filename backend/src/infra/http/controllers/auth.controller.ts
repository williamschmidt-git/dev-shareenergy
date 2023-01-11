import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/middlewares/auth/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() body) {
    console.log(body);
    return this.authService.validateUser(body);
  }
}
