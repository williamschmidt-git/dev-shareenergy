import { Customer } from 'src/app/entities/customer';
import { Customer as RawCustomer } from '@prisma/client';

export class PrismaCustomerMapper {
  static toPrisma(customer: Customer) {
    return {
      id: customer.id,
      address: customer.address,
      email: customer.email,
      cpf: customer.cpf,
      phone_number: customer.phone_number,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    };
  }

  static toDomain(rawData: RawCustomer): Customer {
    return new Customer({
      id: rawData.id,
      address: rawData.address,
      email: rawData.email,
      cpf: rawData.cpf,
      phone_number: rawData.phone_number,
      created_at: rawData.created_at,
      updated_at: rawData.updated_at,
    });
  }
}
