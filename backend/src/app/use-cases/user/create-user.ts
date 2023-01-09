import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/user-repository';

interface CreateUserRequest {
  username: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { username, password } = request;

    const user = new User({
      username,
      password, // <-- change to hash bcrypt
    });

    await this.userRepository.create(user);

    return { user };
  }
}
