import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUser } from 'src/app/use-cases/user/create-user';
import { FindUserByUsername } from 'src/app/use-cases/user/find-user-by-username';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('users')
export class UsersController {
  constructor(
    private createUser: CreateUser,
    private findUserByUsername: FindUserByUsername,
  ) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { password, username } = body;

    const { user } = await this.createUser.execute({
      username,
      password,
    });

    return {
      user: UserViewModel.toHTTP(user),
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
