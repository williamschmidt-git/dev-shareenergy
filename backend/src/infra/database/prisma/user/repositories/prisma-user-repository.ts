import { Injectable } from '@nestjs/common';
import { User } from 'src/app/entities/user';
import { UserRepository } from 'src/app/repositories/user-repository';
import { PrismaUserMapper } from '../mapper/prisma-user-mapper';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const rawData = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: rawData,
    });
  }

  async findByUserName(username: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
}
