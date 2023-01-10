import * as bcrypt from 'bcrypt';

export class HashGenerator {
  static hash(password: string): string {
    const saltRounds = 10;
    const hashPass = bcrypt.hashSync(password, saltRounds);

    return hashPass;
  }
}
