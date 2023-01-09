import { User } from 'src/app/entities/user';
import { User as RawUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
    };
  }

  static toDomain(rawData: RawUser): User {
    return new User({
      id: rawData.id,
      username: rawData.username,
      password: rawData.password,
    });
  }
}
