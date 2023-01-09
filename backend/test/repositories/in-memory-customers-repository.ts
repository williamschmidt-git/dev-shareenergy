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

  delete(id: string): void {
    const customer = this.customers.filter((e) => e.id === id);

    this.customers.splice(this.customers.indexOf(customer[0]), 1);
  }

  async update(key: string, customer: Customer): Promise<void> {
    const customerToUpdate = this.customers.find((e) => e.email === key);
    customerToUpdate['address'] = customer.address;
    customerToUpdate['cpf'] = customer.cpf;
    customerToUpdate['email'] = customer.email;
    customerToUpdate['phone_number'] = customer.phone_number;
    customerToUpdate.update();
  }
}
