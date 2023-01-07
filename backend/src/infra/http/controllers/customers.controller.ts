import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCustomer } from 'src/app/use-cases/create-customer';
import { FindCustomerByEmail } from 'src/app/use-cases/find-customer-by-email';
import { ReadCustomer } from 'src/app/use-cases/read-customers';
import { CreateCustomerBody } from '../dtos/create-customer-body';
import { CustomerViewModel } from '../view-models/customer-view-model';

@Controller('customers')
export class CustomersController {
  constructor(
    private createCustomer: CreateCustomer,
    private readCustomer: ReadCustomer,
    private findCustomerByEmail: FindCustomerByEmail,
  ) {}

  @Post()
  async create(@Body() body: CreateCustomerBody) {
    const { address, cpf, email, phone_number } = body;

    const { customer } = await this.createCustomer.execute({
      address,
      cpf,
      email,
      phone_number,
    });

    return {
      customer: CustomerViewModel.toHTTP(customer),
    };
  }

  @Get()
  async findAll() {
    const { customers } = await this.readCustomer.execute();
    return { customers: customers.map(CustomerViewModel.toHTTP) };
  }

  @Get('from/:email')
  async findByemail(@Param('email') email: string) {
    const { customer } = await this.findCustomerByEmail.execute({ email });

    return {
      customer: CustomerViewModel.toHTTP(customer),
    };
  }
}
