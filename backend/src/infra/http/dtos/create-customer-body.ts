import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCustomerBody {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  phone_number: string;

  @IsEmail()
  email: string;
}

// address: string;
//   cpf: string;
//   phone_number: string;
//   email: string;
//   created_at: Date;
//   updated_at?: Date | null;
