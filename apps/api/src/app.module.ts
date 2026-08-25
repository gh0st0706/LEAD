import { Module } from '@nestjs/common';
import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';
import { PrismaService } from './prisma.service.js';
import { LeadsController } from './leads.controller.js';
import { LeadsService } from './leads.service.js';

@Module({
  controllers: [HealthController, LeadsController],
  providers: [HealthService, PrismaService, LeadsService],
})
export class AppModule {}
