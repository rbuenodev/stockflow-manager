import { IsString, IsOptional, IsHexColor, IsUrl } from 'class-validator';

export class UpdateWhitelabelDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @IsHexColor()
  primaryColor?: string;

  @IsString()
  @IsOptional()
  @IsHexColor()
  secondaryColor?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;
}
