import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [AddressController],
  providers: [PrismaService, AddressService],
  exports: [AddressService]
})
export class AddressModule {}
