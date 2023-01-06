import { Injectable } from '@nestjs/common';
import { Customer } from 'src/app/entities/customer';
import { CustomerRepository } from 'src/app/repositories/customer-repository';
import { PrismaCustomerMapper } from '../mapper/prisma-customer-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prisma: PrismaService) {}

  async create(customer: Customer): Promise<void> {
    const rawData = PrismaCustomerMapper.toPrisma(customer);

    await this.prisma.customer.create({
      data: rawData,
    });
  }
}