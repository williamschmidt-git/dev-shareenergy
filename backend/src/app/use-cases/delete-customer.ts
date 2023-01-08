import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../repositories/customer-repository';

interface DeleteCustomerRequest {
  email: string;
}

type DeleteCustomerResponse = void;

@Injectable()
export class DeleteCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(
    request: DeleteCustomerRequest,
  ): Promise<DeleteCustomerResponse> {
    const { email } = request;
    this.customerRepository.delete(email);
  }
}
