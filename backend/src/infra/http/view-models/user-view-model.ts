import { User } from 'src/app/entities/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      username: user.username,
    };
  }
}
