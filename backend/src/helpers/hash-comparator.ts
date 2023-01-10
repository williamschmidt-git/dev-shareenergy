import * as bcrypt from 'bcrypt';

export class HashComparator {
  static async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
