import { InMemoryCustomerRepository } from '../../../test/repositories/in-memory-customers-repository';
import { CreateCustomer } from './create-customer';
import { ReadCustomer } from './read-customers';

describe('Read Customers', () => {
  it('should be able to read all Customers of database', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const createCustomer = new CreateCustomer(customerRepository);
    const readCustomer = new ReadCustomer(customerRepository);

    await createCustomer.execute({
      address: 'rua1',
      cpf: '11111111111',
      email: 'email@email',
      phone_number: '99 9999-9999',
    });

    await createCustomer.execute({
      address: 'rua2',
      cpf: '22222222222',
      email: 'email@email',
      phone_number: '99 9999-9990',
    });

    const { customers } = await readCustomer.execute();

    expect(customers).toHaveLength(2);
  });
});
