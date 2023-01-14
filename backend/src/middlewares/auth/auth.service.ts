import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/app/entities/user';
import { FindUserByUsername } from 'src/app/use-cases/user/find-user-by-username';
import { HashComparator } from 'src/helpers/hash-comparator';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserByUsername: FindUserByUsername,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: User): Promise<any> {
    const userToCompare = await this.findUserByUsername.execute({
      username: user.username,
    });

    if (!userToCompare) {
      throw new UnauthorizedException('Invalid user or password.');
    }

    const { password } = user;

    if (await HashComparator.compare(password, userToCompare.user.password)) {
      return await this.genToken(user);
    }

    throw new UnauthorizedException('Invalid user or password.');
  }

  async genToken(payload: User) {
    return {
      access_token: this.jwtService.sign(
        {
          username: payload.username,
        },
        {
          secret: 'SECRET',
          expiresIn: '7d',
        },
      ),
    };
  }

  async authorization(token: string) {
    if (!token) throw new Error('Token not found.');

    if (token) {
      return this.jwtService.verify(token, { secret: 'SECRET' });
    }

    throw new Error('Invalid access token.');
  }
}
