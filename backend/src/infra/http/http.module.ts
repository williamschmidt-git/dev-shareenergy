import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateCustomer } from 'src/app/use-cases/create-customer';
import { DeleteCustomer } from 'src/app/use-cases/delete-customer';
import { FindCustomerByEmail } from 'src/app/use-cases/find-customer-by-email';
import { ReadCustomer } from 'src/app/use-cases/read-customers';
import { UpdateCustomer } from 'src/app/use-cases/update-customer';
import { CreateUser } from 'src/app/use-cases/user/create-user';
import { FindUserByUsername } from 'src/app/use-cases/user/find-user-by-username';
import { AuthService } from 'src/middlewares/auth/auth.service';
import { DatabaseModule } from '../database/database.module';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController, UsersController],
  providers: [
    CreateCustomer,
    ReadCustomer,
    FindCustomerByEmail,
    DeleteCustomer,
    UpdateCustomer,
    CreateUser,
    FindUserByUsername,
    AuthService,
    JwtService,
  ],
})
export class HttpModule {}
