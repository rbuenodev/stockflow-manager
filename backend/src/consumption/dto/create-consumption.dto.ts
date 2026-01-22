import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConsumptionDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
