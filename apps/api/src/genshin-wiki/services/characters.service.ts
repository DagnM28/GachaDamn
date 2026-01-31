import { Injectable } from '@nestjs/common';
import { GenshinPrismaService } from '../../prisma';
import { CharacterQueryDto, Language } from '../dto/query.dto';

@Injectable()
export class CharactersService {
  constructor(private readonly prisma: GenshinPrismaService) {}

  async findAll(query: CharacterQueryDto) {
    const {
      lang = Language.EN,
      page = 1,
      limit = 20,
      name,
      elementType,
      weaponType,
      region,
      rarity,
      bodyType,
      gender,
    } = query;

    const where: any = { lang };

    // Case-insensitive filters
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (elementType)
      where.elementType = { equals: elementType, mode: 'insensitive' };
    if (weaponType)
      where.weaponType = { equals: weaponType, mode: 'insensitive' };
    if (region) where.region = { equals: region, mode: 'insensitive' };
    if (bodyType) where.bodyType = { equals: bodyType, mode: 'insensitive' };
    if (gender) where.gender = { equals: gender, mode: 'insensitive' };
    if (rarity) where.rarity = rarity;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.character.findMany({
        where,
        include: { ascensionCosts: true },
        orderBy: { name: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.character.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number, lang: Language = Language.EN) {
    return this.prisma.character.findFirst({
      where: { id, lang },
      include: { ascensionCosts: true },
    });
  }

  async findByName(name: string, lang: Language = Language.EN) {
    return this.prisma.character.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        lang,
      },
      include: { ascensionCosts: true },
    });
  }

  async findByElement(element: string, lang: Language = Language.EN) {
    return this.prisma.character.findMany({
      where: {
        lang,
        elementType: { equals: element, mode: 'insensitive' },
      },
      include: { ascensionCosts: true },
      orderBy: { name: 'asc' },
    });
  }

  async findByRarity(rarity: number, lang: Language = Language.EN) {
    return this.prisma.character.findMany({
      where: { lang, rarity },
      include: { ascensionCosts: true },
      orderBy: { name: 'asc' },
    });
  }

  async findByRegion(region: string, lang: Language = Language.EN) {
    return this.prisma.character.findMany({
      where: {
        lang,
        region: { equals: region, mode: 'insensitive' },
      },
      include: { ascensionCosts: true },
      orderBy: { name: 'asc' },
    });
  }

  async findByWeaponType(weaponType: string, lang: Language = Language.EN) {
    return this.prisma.character.findMany({
      where: {
        lang,
        weaponType: { equals: weaponType, mode: 'insensitive' },
      },
      include: { ascensionCosts: true },
      orderBy: { name: 'asc' },
    });
  }
}
