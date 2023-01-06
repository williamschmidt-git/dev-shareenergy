import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer';
import { CustomerRepository } from '../repositories/customer-repository';

interface CreateCustomerRequest {
  customerId: string;
  email: string;
  phone_number: string;
  address: string;
  cpf: string;
}

interface CreateCustomerResponse {
  customer: Customer;
}

@Injectable()
export class CreateCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(
    request: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> {
    const { address, cpf, phone_number, email } = request;

    const customer = new Customer({
      address,
      cpf,
      phone_number,
      email,
    });

    await this.customerRepository.create(customer);

    return { customer };
  }
}
