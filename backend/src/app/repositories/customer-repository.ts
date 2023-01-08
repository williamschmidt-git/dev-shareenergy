import { CreateCustomerBody } from 'src/infra/http/dtos/create-customer-body';
import { Customer } from '../entities/customer';

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>;
  abstract findAll(): Promise<Customer[]>;
  abstract findByEmail(email: string): Promise<Customer>;
  abstract delete(email: string): void;
  abstract update(key: string, body: CreateCustomerBody): Promise<void>;
}
