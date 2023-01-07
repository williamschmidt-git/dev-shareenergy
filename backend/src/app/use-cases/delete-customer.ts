import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer';
import { CustomerRepository } from '../repositories/customer-repository';
import { CustomerNotFound } from './errors/customer-not.found';

interface DeleteCustomerRequest {
  id: string;
}

type DeleteCustomerResponse = void;

@Injectable()
export class DeleteCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(
    request: DeleteCustomerRequest,
  ): Promise<DeleteCustomerResponse> {
    const { id } = request;
    this.customerRepository.delete(id);
  }
}
