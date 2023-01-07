import { InMemoryCustomerRepository } from '../../../test/repositories/in-memory-customers-repository';
import { CreateCustomer } from './create-customer';

describe('Create Customer', () => {
  it('should be able to create a Customer in database', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const createCustomer = new CreateCustomer(customerRepository);

    const { customer } = await createCustomer.execute({
      address: 'rua1',
      cpf: '11111111111',
      email: 'email@email',
      phone_number: '99 9999-9999',
    });

    expect(customerRepository.customers).toHaveLength(1);
    expect(customerRepository.customers[0]).toEqual(customer);
  });
});
