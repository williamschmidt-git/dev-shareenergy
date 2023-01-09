import { User } from '../../entities/user';
import { InMemoryUserDatabase } from '../../../../test/repositories/in-memory-users-repository';
import { UserNotFound } from '../errors/user-not-found';
import { FindUserByUsername } from './find-user-by-username';

describe('Find User by username', () => {
  it('should be able to find User by username', async () => {
    const userRepository = new InMemoryUserDatabase();
    const findUserByUsername = new FindUserByUsername(userRepository);

    const user = new User({
      username: 'username',
      password: 'password',
    });

    await userRepository.create(user);

    const foundUser = await findUserByUsername.execute({
      username: user.username,
    });

    expect(foundUser).toHaveProperty('user.props.username');
  });

  it('should not be able to find User by username', async () => {
    const userRepository = new InMemoryUserDatabase();
    const findUserByUsername = new FindUserByUsername(userRepository);

    const username = ' ';

    expect(() => {
      return findUserByUsername.execute({
        username,
      });
    }).rejects.toThrow(UserNotFound);
  });
});
