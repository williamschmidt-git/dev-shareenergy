import { makeCustomer } from '../../../test/factories/customer-repository';
import { InMemoryCustomerRepository } from '../../../test/repositories/in-memory-customers-repository';
import { CustomerNotFound } from './errors/customer-not.found';
import { FindCustomerByEmail } from './find-customer-by-email';

describe('Find Customer by email', () => {
  it('should be able to find Customer by email', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const findCustomerByEmail = new FindCustomerByEmail(customerRepository);

    const customer = makeCustomer();

    await customerRepository.create(customer);

    const foundCustomer = await findCustomerByEmail.execute({
      email: customer.email,
    });

    expect(foundCustomer).toHaveProperty('customer.props.email');
  });

  it('should not be able to find Customer by email', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const findCustomerByEmail = new FindCustomerByEmail(customerRepository);

    const email = ' ';

    expect(() => {
      return findCustomerByEmail.execute({
        email,
      });
    }).rejects.toThrow(CustomerNotFound);
  });
});
