import { Module } from '@nestjs/common';
import { CreateCustomer } from 'src/app/use-cases/create-customer';
import { DeleteCustomer } from 'src/app/use-cases/delete-customer';
import { FindCustomerByEmail } from 'src/app/use-cases/find-customer-by-email';
import { ReadCustomer } from 'src/app/use-cases/read-customers';
import { UpdateCustomer } from 'src/app/use-cases/update-customer';
import { DatabaseModule } from '../database/database.module';
import { CustomersController } from './controllers/customers.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [
    CreateCustomer,
    ReadCustomer,
    FindCustomerByEmail,
    DeleteCustomer,
    UpdateCustomer,
  ],
})
export class HttpModule {}
