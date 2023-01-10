import { User } from 'src/app/entities/user';
import { User as RawUser } from '@prisma/client';
import { HashGenerator } from 'src/helpers/hash-generator';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    const hashPass = HashGenerator.hash(user.password);
    return {
      id: user.id,
      username: user.username,
      password: hashPass,
    };
  }

  static async toDomain(rawData: RawUser): Promise<User> {
    return new User({
      id: rawData.id,
      username: rawData.username,
      password: rawData.password,
    });
  }
}
