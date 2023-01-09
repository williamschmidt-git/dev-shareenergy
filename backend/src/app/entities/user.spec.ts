import { User } from './user';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      username: 'username',
      password: 'password',
    });

    expect(user).toBeTruthy();
  });
});
