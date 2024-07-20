import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { RoleModule } from './modules/role/role.module';

import { SendGridModule } from '@anchan828/nest-sendgrid';

import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    SendGridModule.forRoot({ apikey: process.env.SENDGRID_API_KEY }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    UsersModule,
    MailerModule,
    RoleModule,
   
  ],
})
export class AppModule {}
