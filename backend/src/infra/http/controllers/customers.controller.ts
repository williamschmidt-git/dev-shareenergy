import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCustomer } from 'src/app/use-cases/create-customer';
import { CreateCustomerBody } from '../dtos/create-customer-body';
import { CustomerViewModel } from '../view-models/customer-view-model';

@Controller('customers')
export class CustomersController {
  constructor(private createCustomer: CreateCustomer) {}

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
  async read() {
    return 'Hello World';
  }
}
