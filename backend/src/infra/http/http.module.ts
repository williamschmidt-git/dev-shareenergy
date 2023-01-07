import { Module } from '@nestjs/common';
import { CreateCustomer } from 'src/app/use-cases/create-customer';
import { FindCustomerByEmail } from 'src/app/use-cases/find-customer-by-email';
import { ReadCustomer } from 'src/app/use-cases/read-customers';
import { DatabaseModule } from '../database/database.module';
import { CustomersController } from './controllers/customers.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [CreateCustomer, ReadCustomer, FindCustomerByEmail],
})
export class HttpModule {}
