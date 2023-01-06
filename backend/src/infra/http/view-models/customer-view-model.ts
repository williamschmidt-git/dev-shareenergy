import { Customer } from 'src/app/entities/customer';

export class CustomerViewModel {
  static toHTTP(customer: Customer) {
    return {
      id: customer.id,
      address: customer.address,
      email: customer.email,
      phone_number: customer.phone_number,
      cpf: customer.cpf,
    };
  }
}
