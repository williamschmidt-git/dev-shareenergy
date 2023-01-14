import { Module } from '@nestjs/common';
import { CustomerDatabaseModule } from './prisma/customer/customer-database.module';
import { UserDatabaseModule } from './prisma/user/user-database.module';

@Module({
  imports: [CustomerDatabaseModule, UserDatabaseModule],
  exports: [CustomerDatabaseModule, UserDatabaseModule],
})
export class DatabaseModule {}
