import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum BatchUpdateType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

export class BatchUpdateProductDto {
  @IsEnum(BatchUpdateType)
  type: BatchUpdateType;

  @IsNumber()
  value: number;

  @IsOptional()
  @IsNumber()
  stockAdjustment?: number;
}
