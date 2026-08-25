import { LeadStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateLeadDto {
  @IsString() @MinLength(2) @MaxLength(80) name!: string;
  @IsEmail() email!: string;
  @IsString() @MinLength(2) @MaxLength(100) company!: string;
  @Type(() => Number) @IsInt() @Min(0) value!: number;
  @IsOptional() @IsString() @MaxLength(500) notes?: string;
}

export class UpdateLeadStatusDto {
  @IsEnum(LeadStatus) status!: LeadStatus;
}
