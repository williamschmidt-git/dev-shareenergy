import { Customer } from '../../src/app/entities/customer';
import { CustomerRepository } from 'src/app/repositories/customer-repository';

export class InMemoryCustomerRepository implements CustomerRepository {
  public customers: Customer[] = [];

  async create(customer: Customer) {
    this.customers.push(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customers;
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = this.customers.find((e) => e.email === email);
    return customer;
  }
}
