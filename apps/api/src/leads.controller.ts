import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateLeadDto, UpdateLeadStatusDto } from './lead.dto.js';
import { LeadsService } from './leads.service.js';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}
  @Get() list() { return this.leads.list(); }
  @Post() create(@Body() body: CreateLeadDto) { return this.leads.create(body); }
  @Patch(':id/status') updateStatus(@Param('id') id: string, @Body() body: UpdateLeadStatusDto) { return this.leads.updateStatus(id, body.status); }
  @Delete(':id') @HttpCode(200) remove(@Param('id') id: string) { return this.leads.remove(id); }
}
