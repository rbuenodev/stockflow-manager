import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ConsumptionModule } from './consumption/consumption.module';
import { WhitelabelModule } from './whitelabel/whitelabel.module';
import { MetricsModule } from './metrics/metrics.module';
import { PrismaModule } from './prisma/prisma.module';

import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './auth/api-key.guard';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ProductsModule, ConsumptionModule, WhitelabelModule, MetricsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
