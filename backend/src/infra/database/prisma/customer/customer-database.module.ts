import { Module } from '@nestjs/common';
import { CustomerRepository } from 'src/app/repositories/customer-repository';
import { PrismaService } from '../prisma.service';
import { PrismaCustomerRepository } from './repositories/prisma-customer-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
  ],
  exports: [CustomerRepository],
})
export class CustomerDatabaseModule {}
