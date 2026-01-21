export class CharacterResponseDto {
  id: number;
  name: string;
  title: string;
  description: string;
  weaponType: string;
  weaponText: string;
  bodyType: string;
  gender: string;
  qualityType: string;
  rarity: number;
  birthdayMmdd?: string;
  birthday?: string;
  elementType: string;
  elementText: string;
  affiliation: string;
  associationType: string;
  region: string;
  substatType: string;
  substatText: string;
  constellation: string;
  cvEnglish?: string;
  cvChinese?: string;
  cvJapanese?: string;
  cvKorean?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CharacterDetailResponseDto extends CharacterResponseDto {
  ascensionCosts: AscensionCostDto[];
}

export class AscensionCostDto {
  id: string;
  phase: string;
  itemId: number;
  itemName: string;
  count: number;
}

export class PaginatedCharactersResponseDto {
  data: CharacterResponseDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
