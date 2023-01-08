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

  async findAll(): Promise<Customer[] | []> {
    const customers = await this.prisma.customer.findMany();

    if (customers.length === 0) {
      return [];
    }

    return customers.map(PrismaCustomerMapper.toDomain);
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prisma.customer
      .findUnique({
        where: {
          email,
        },
      })
      .catch((err) => err);

    if (customer.length === 0) {
      return null;
    }

    return PrismaCustomerMapper.toDomain(customer);
  }

  async update(key: string, customer: Customer): Promise<void> {
    await this.prisma.customer.update({
      where: {
        email: key,
      },
      data: {
        ...customer,
      },
    });
  }

  async delete(email: string): Promise<void> {
    await this.prisma.customer.delete({
      where: {
        email,
      },
    });
  }
}
