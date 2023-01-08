import { Injectable } from '@nestjs/common';
import { CreateCustomerBody } from 'src/infra/http/dtos/create-customer-body';
import { Customer } from '../entities/customer';
import { CustomerRepository } from '../repositories/customer-repository';
import { CustomerNotFound } from './errors/customer-not.found';

interface UpdateCustomerRequest {
  key: string;
  body: CreateCustomerBody;
}

interface UpdateCustomerResponse {
  updatedCustomer: Customer;
}

type UpdateCustomerResponse1 = void;

@Injectable()
export class UpdateCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(
    request: UpdateCustomerRequest,
  ): Promise<UpdateCustomerResponse1> {
    const { key, body } = request;

    await this.customerRepository.update(key, body);

    // return { updatedCustomer };
  }
}
