import { Controller, Post } from '@nestjs/common';
import { CreateCustomer } from 'src/app/use-cases/create-customer';

@Controller('customers')
export class CustomersController {
  constructor(private createCustomer: CreateCustomer) {}

  @Post()
  async create(@Body() body: CreateCustomerBody) {}
}
