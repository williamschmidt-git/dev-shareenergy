import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByUserName(username: string): Promise<User>;
}
