import { makeCustomer } from '../../../test/factories/customer-repository';
import { InMemoryCustomerRepository } from '../../../test/repositories/in-memory-customers-repository';
import { CustomerNotFound } from './errors/customer-not.found';
import { FindCustomerByEmail } from './find-customer-by-email';

describe('Find Customer by id', () => {
  it('should be able to find Customer by id', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const findCustomerByEmail = new FindCustomerByEmail(customerRepository);

    const customer = makeCustomer();

    customerRepository.create(customer);

    const foundCustomer = await findCustomerByEmail.execute({
      email: customer.email,
    });

    expect(foundCustomer).toHaveProperty('customer.props.id');
  });

  it('should not be able to find Customer by id', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const findCustomerByEmail = new FindCustomerByEmail(customerRepository);

    const email = 'blablablablablalba';

    expect(() => {
      return findCustomerByEmail.execute({
        email,
      });
    }).rejects.toThrow(CustomerNotFound);
  });
});
