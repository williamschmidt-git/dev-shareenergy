import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer';
import { CustomerRepository } from '../repositories/customer-repository';

interface ReadCustomerResponse {
  customers: Customer[];
}

@Injectable()
export class ReadCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(): Promise<ReadCustomerResponse> {
    const customers = await this.customerRepository.findAll();

    return { customers };
  }
}
