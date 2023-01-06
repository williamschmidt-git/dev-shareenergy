import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    // {
    //   provide: NotificationsRepository,
    //     useClass: PrismaNotificationsRepository,
    // }
  ],
  // exports: NotificationsRepository
})
export class DatabaseModule {}
