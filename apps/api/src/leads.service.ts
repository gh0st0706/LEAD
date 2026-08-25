import { Injectable, NotFoundException } from '@nestjs/common';
import { LeadStatus } from '@prisma/client';
import { CreateLeadDto } from './lead.dto.js';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}
  list() { return this.prisma.lead.findMany({ orderBy: { createdAt: 'desc' } }); }
  create(data: CreateLeadDto) { return this.prisma.lead.create({ data }); }
  async updateStatus(id: string, status: LeadStatus) {
    if (!await this.prisma.lead.findUnique({ where: { id } })) throw new NotFoundException('Lead not found');
    return this.prisma.lead.update({ where: { id }, data: { status } });
  }
  async remove(id: string) {
    if (!await this.prisma.lead.findUnique({ where: { id } })) throw new NotFoundException('Lead not found');
    await this.prisma.lead.delete({ where: { id } });
    return { deleted: true };
  }
}
