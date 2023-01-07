import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer';
import { CustomerRepository } from '../repositories/customer-repository';
import { CustomerNotFound } from './errors/customer-not.found';

interface FindCustomerByEmailRequest {
  email: string;
}

interface FindCustomerByEmailResponse {
  customer: Customer;
}

@Injectable()
export class FindCustomerByEmail {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(
    request: FindCustomerByEmailRequest,
  ): Promise<FindCustomerByEmailResponse> {
    const { email } = request;
    const customer = await this.customerRepository.findByEmail(email);

    // if (!customer) {
    //   throw new CustomerNotFound();
    // }

    return { customer };
  }
}
