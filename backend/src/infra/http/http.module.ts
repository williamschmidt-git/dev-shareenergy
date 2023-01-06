import { Module } from '@nestjs/common';
import { CreateCustomer } from 'src/app/use-cases/create-customer';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [CreateCustomer],
})
export class HttpModule {}
