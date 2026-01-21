import { IsOptional, IsString, IsInt, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryCharactersDto {
  @IsOptional()
  @IsIn(['en', 'vn'])
  lang?: 'en' | 'vn' = 'en';

  @IsOptional()
  @IsString()
  elementType?: string;

  @IsOptional()
  @IsString()
  weaponType?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  rarity?: number;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  search?: string;
}
