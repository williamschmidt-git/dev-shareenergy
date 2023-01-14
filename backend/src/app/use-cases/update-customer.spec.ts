import { makeCustomer } from '../../../test/factories/customer-repository';
import { InMemoryCustomerRepository } from '../../../test/repositories/in-memory-customers-repository';
import { Customer, CustomerData } from '../entities/customer';
import { UpdateCustomer } from './update-customer';

describe('Update Customer', () => {
  it('should be able to update Customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const updateCustomer = new UpdateCustomer(customerRepository);

    const customer = makeCustomer();

    customerRepository.create(customer);

    await updateCustomer.execute({
      key: customer.email,
      body: customer,
    });

    expect(customerRepository.customers[0].updated_at).toEqual(
      expect.any(Date),
    );
  });
});
