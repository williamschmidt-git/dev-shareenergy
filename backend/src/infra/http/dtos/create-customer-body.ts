import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateCustomerBody {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @Length(11)
  cpf: string;

  @IsNotEmpty()
  phone_number: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  customer_name: string;
}

// address: string;
//   cpf: string;
//   phone_number: string;
//   email: string;
//   created_at: Date;
//   updated_at?: Date | null;
