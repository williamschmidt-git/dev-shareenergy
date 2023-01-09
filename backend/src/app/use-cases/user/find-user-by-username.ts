import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/user-repository';
import { UserNotFound } from '../errors/user-not-found';

interface FindUserByUsernameRequest {
  username: string;
}

interface FindUserByUsernameResponse {
  user: User;
}

@Injectable()
export class FindUserByUsername {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: FindUserByUsernameRequest,
  ): Promise<FindUserByUsernameResponse> {
    const { username } = request;

    const user = await this.userRepository.findByUserName(username);

    if (!user) {
      throw new UserNotFound();
    }

    return { user };
  }
}
