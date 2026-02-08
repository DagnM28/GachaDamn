import { IsEnum, IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Language {
  EN = 'en',
  VN = 'vn',
}

export class LanguageQueryDto {
  @ApiPropertyOptional({
    enum: Language,
    default: Language.EN,
    description: 'Ngôn ngữ trả về (en hoặc vn)',
    example: 'en',
  })
  @IsOptional()
  @IsEnum(Language)
  lang?: Language = Language.EN;
}

export class PaginationQueryDto extends LanguageQueryDto {
  @ApiPropertyOptional({
    type: Number,
    minimum: 1,
    default: 1,
    description: 'Số trang',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    type: Number,
    minimum: 1,
    maximum: 100,
    default: 20,
    description: 'Số lượng kết quả mỗi trang (tối đa 100)',
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class CharacterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Tìm kiếm theo tên nhân vật',
    example: 'Diluc',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    type: String,
    description:
      'Lọc theo nguyên tố (Pyro, Hydro, Anemo, Electro, Dendro, Cryo, Geo)',
    example: 'Pyro',
  })
  @IsOptional()
  @IsString()
  elementType?: string;

  @ApiPropertyOptional({
    type: String,
    description:
      'Lọc theo loại vũ khí (Sword, Claymore, Polearm, Bow, Catalyst)',
    example: 'Claymore',
  })
  @IsOptional()
  @IsString()
  weaponType?: string;

  @ApiPropertyOptional({
    type: String,
    description:
      'Lọc theo khu vực (Mondstadt, Liyue, Inazuma, Sumeru, Fontaine, Natlan, Snezhnaya)',
    example: 'Mondstadt',
  })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Lọc theo độ hiếm (4 hoặc 5 sao)',
    example: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  rarity?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Lọc theo loại hình thể',
    example: 'MALE',
  })
  @IsOptional()
  @IsString()
  bodyType?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Lọc theo giới tính',
    example: 'Male',
  })
  @IsOptional()
  @IsString()
  gender?: string;
}

export class WeaponQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Tìm kiếm theo tên vũ khí',
    example: "Wolf's Gravestone",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    type: String,
    description:
      'Lọc theo loại vũ khí (Sword, Claymore, Polearm, Bow, Catalyst)',
    example: 'Claymore',
  })
  @IsOptional()
  @IsString()
  weaponType?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Lọc theo độ hiếm (1-5 sao)',
    example: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  rarity?: number;
}

export class MaterialQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Tìm kiếm theo tên nguyên liệu',
    example: 'Mora',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Lọc theo danh mục nguyên liệu',
    example: 'Character Ascension Material',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Lọc theo độ hiếm (1-5 sao)',
    example: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  rarity?: number;
}

export class ArtifactQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Tìm kiếm theo tên bộ thánh di vật',
    example: "Gladiator's Finale",
  })
  @IsOptional()
  @IsString()
  name?: string;
}

export class DomainQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Tìm kiếm theo tên bí cảnh',
    example: 'Domain of Guyun',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Lọc theo loại bí cảnh',
    example: 'Artifact',
  })
  @IsOptional()
  @IsString()
  domainType?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Lọc theo khu vực',
    example: 'Liyue',
  })
  @IsOptional()
  @IsString()
  regionName?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Lọc theo cấp độ khuyến nghị',
    example: 90,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  recommendedLevel?: number;
}
