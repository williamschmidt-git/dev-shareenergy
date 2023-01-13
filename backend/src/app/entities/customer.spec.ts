import { Customer } from './customer';

describe('Customer', () => {
  it('should be able to create a customer', () => {
    const customer = new Customer({
      address: 'rua 1',
      email: 'email@email.com',
      cpf: '11111111111',
      phone_number: '99 9999-9999',
      name: 'namename',
    });

    expect(customer).toBeTruthy();
  });
});
