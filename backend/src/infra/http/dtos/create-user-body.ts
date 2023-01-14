import { IsNotEmpty } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
