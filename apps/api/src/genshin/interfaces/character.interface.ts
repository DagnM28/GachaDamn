export interface ICharacter {
  id: number;
  name: string;
  title: string;
  description: string;
  weaponType: string;
  weaponText: string;
  elementType: string;
  elementText: string;
  rarity: number;
  region: string;
}

export interface ICharacterFilter {
  elementType?: string;
  weaponType?: string;
  rarity?: number;
  region?: string;
  search?: string;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
