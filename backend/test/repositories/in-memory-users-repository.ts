import { User } from '../../src/app/entities/user';
import { UserRepository } from '../../src/app/repositories/user-repository';

export class InMemoryUserDatabase implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
  async findByUserName(username: string): Promise<User> {
    const user = this.users.find((e) => e.username === username);

    return user;
  }
}
