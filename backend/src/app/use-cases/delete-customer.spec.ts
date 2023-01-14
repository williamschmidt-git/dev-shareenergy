import { makeCustomer } from '../../../test/factories/customer-repository';
import { InMemoryCustomerRepository } from '../../../test/repositories/in-memory-customers-repository';
import { DeleteCustomer } from './delete-customer';

describe('Delete Customer by email', () => {
  it('should be able to delete Customer by email', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const deleteCustomer = new DeleteCustomer(customerRepository);

    const customer = makeCustomer();

    customerRepository.create(customer);

    await deleteCustomer.execute({
      email: customer.email,
    });

    expect(customerRepository.customers[0]).not.toBeTruthy();
  });
});
