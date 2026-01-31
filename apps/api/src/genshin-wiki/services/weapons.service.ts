import { Injectable } from '@nestjs/common';
import { GenshinPrismaService } from '../../prisma';
import { WeaponQueryDto, Language } from '../dto/query.dto';

@Injectable()
export class WeaponsService {
  constructor(private readonly prisma: GenshinPrismaService) {}

  async findAll(query: WeaponQueryDto) {
    const {
      lang = Language.EN,
      page = 1,
      limit = 20,
      name,
      weaponType,
      rarity,
    } = query;

    const where: any = { lang };

    // Case-insensitive filters
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (weaponType)
      where.weaponType = { equals: weaponType, mode: 'insensitive' };
    if (rarity) where.rarity = rarity;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.weapon.findMany({
        where,
        include: {
          refinements: true,
          ascensionCosts: true,
        },
        orderBy: { name: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.weapon.count({ where }),
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
    return this.prisma.weapon.findFirst({
      where: { id, lang },
      include: {
        refinements: true,
        ascensionCosts: true,
      },
    });
  }

  async findByName(name: string, lang: Language = Language.EN) {
    return this.prisma.weapon.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        lang,
      },
      include: {
        refinements: true,
        ascensionCosts: true,
      },
    });
  }

  async findByType(weaponType: string, lang: Language = Language.EN) {
    return this.prisma.weapon.findMany({
      where: {
        lang,
        weaponType: { equals: weaponType, mode: 'insensitive' },
      },
      include: {
        refinements: true,
        ascensionCosts: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findByRarity(rarity: number, lang: Language = Language.EN) {
    return this.prisma.weapon.findMany({
      where: { lang, rarity },
      include: {
        refinements: true,
        ascensionCosts: true,
      },
      orderBy: { name: 'asc' },
    });
  }
}
