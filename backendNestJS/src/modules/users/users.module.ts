import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtRefreshTokenStrategy } from '../security/jwt-refresh.strategy';
import { JwtStrategy } from '../security/strategy.service';
import { JwtModule } from '@nestjs/jwt';
import { LoggingInterceptor } from '../utils/logger';




@Module({
  imports : [JwtModule.register({}) ],
  controllers: [UsersController],
  providers: [UsersService,  JwtStrategy, JwtRefreshTokenStrategy,
  
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
  ],
  exports: [UsersService]
})
export class UsersModule {}
