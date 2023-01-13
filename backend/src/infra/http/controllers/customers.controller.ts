import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateCustomer } from 'src/app/use-cases/create-customer';
import { DeleteCustomer } from 'src/app/use-cases/delete-customer';
import { FindCustomerByEmail } from 'src/app/use-cases/find-customer-by-email';
import { ReadCustomer } from 'src/app/use-cases/read-customers';
import { UpdateCustomer } from 'src/app/use-cases/update-customer';
import { CreateCustomerBody } from '../dtos/create-customer-body';
import { CustomerViewModel } from '../view-models/customer-view-model';

@Controller('customers')
export class CustomersController {
  constructor(
    private createCustomer: CreateCustomer,
    private readCustomer: ReadCustomer,
    private findCustomerByEmail: FindCustomerByEmail,
    private deleteCustomer: DeleteCustomer,
    private updateCustomer: UpdateCustomer,
  ) {}

  @Post()
  async create(@Body() body: CreateCustomerBody) {
    const { address, cpf, email, phone_number, customer_name } = body;

    const { customer } = await this.createCustomer.execute({
      address,
      cpf,
      email,
      phone_number,
      customer_name,
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

  @Put('from/:key')
  async update(@Param('key') key: string, @Body() body: CreateCustomerBody) {
    await this.updateCustomer.execute({ key, body });
  }

  @Delete('from/:email')
  async delete(@Param('email') email: string) {
    await this.deleteCustomer.execute({ email });
  }
}
