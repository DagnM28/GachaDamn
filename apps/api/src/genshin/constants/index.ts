export const SUPPORTED_LANGUAGES = ['en', 'vn'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

export const ELEMENT_TYPES = {
  PYRO: 'ELEMENT_PYRO',
  HYDRO: 'ELEMENT_HYDRO',
  ANEMO: 'ELEMENT_ANEMO',
  ELECTRO: 'ELEMENT_ELECTRO',
  DENDRO: 'ELEMENT_DENDRO',
  CRYO: 'ELEMENT_CRYO',
  GEO: 'ELEMENT_GEO',
} as const;

export const WEAPON_TYPES = {
  SWORD: 'WEAPON_SWORD',
  CLAYMORE: 'WEAPON_CLAYMORE',
  POLEARM: 'WEAPON_POLE',
  BOW: 'WEAPON_BOW',
  CATALYST: 'WEAPON_CATALYST',
} as const;

export const RARITIES = [4, 5] as const;
