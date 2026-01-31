import { IsEnum, IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum Language {
  EN = 'en',
  VN = 'vn',
}

export class LanguageQueryDto {
  @IsOptional()
  @IsEnum(Language)
  lang?: Language = Language.EN;
}

export class PaginationQueryDto extends LanguageQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class CharacterQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  elementType?: string;

  @IsOptional()
  @IsString()
  weaponType?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  rarity?: number;

  @IsOptional()
  @IsString()
  bodyType?: string;

  @IsOptional()
  @IsString()
  gender?: string;
}

export class WeaponQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  weaponType?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  rarity?: number;
}

export class MaterialQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  rarity?: number;
}

export class ArtifactQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  name?: string;
}

export class DomainQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  domainType?: string;

  @IsOptional()
  @IsString()
  regionName?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  recommendedLevel?: number;
}
