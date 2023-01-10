import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUser } from 'src/app/use-cases/user/create-user';
import { FindUserByUsername } from 'src/app/use-cases/user/find-user-by-username';
import { AuthService } from 'src/middlewares/auth/auth.service';
import { CreateUserBody } from '../dtos/create-user-body';
import { AuthViewModel } from '../view-models/auth-view-model';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('users')
export class UsersController {
  constructor(
    private createUser: CreateUser,
    private findUserByUsername: FindUserByUsername,
    private authService: AuthService,
  ) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { password, username } = body;

    const { user } = await this.createUser.execute({
      username,
      password,
    });

    const token = await this.authService.genToken(user);

    return {
      user: UserViewModel.toHTTP(user),
      token: AuthViewModel.toHTTP(token.access_token),
    };
  }

  @Get('from/:username')
  async findByUsername(@Param('username') username: string) {
    const { user } = await this.findUserByUsername.execute({ username });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }
}
