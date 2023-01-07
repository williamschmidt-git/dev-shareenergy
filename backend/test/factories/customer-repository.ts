import { Customer, CustomerData } from '../../src/app/entities/customer';

type Override = Partial<CustomerData>;

export function makeCustomer(override: Override = {}) {
  return new Customer({
    address: 'rua1',
    cpf: '11111111111',
    email: 'email@email',
    phone_number: '99 9999-9999',
    ...override,
  });
}
