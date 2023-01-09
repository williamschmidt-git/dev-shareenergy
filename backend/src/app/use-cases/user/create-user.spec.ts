import { InMemoryUserDatabase } from '../../../../test/repositories/in-memory-users-repository';
import { CreateUser } from './create-user';

describe.only('Create User', () => {
  it('should be able to create a User in database', async () => {
    const userRepository = new InMemoryUserDatabase();
    const createUser = new CreateUser(userRepository);

    const { user } = await createUser.execute({
      username: 'username',
      password: 'password',
    });

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
  });
});
