import { Injectable } from '@nestjs/common';
import { GenshinPrismaService } from '../../prisma';
import { MaterialQueryDto, Language } from '../dto/query.dto';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: GenshinPrismaService) {}

  async findAll(query: MaterialQueryDto) {
    const {
      lang = Language.EN,
      page = 1,
      limit = 20,
      name,
      category,
      rarity,
    } = query;

    const where: any = { lang };

    // Case-insensitive filters
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (category) where.category = { equals: category, mode: 'insensitive' };
    if (rarity) where.rarity = rarity;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.material.findMany({
        where,
        orderBy: [{ category: 'asc' }, { sortRank: 'asc' }, { name: 'asc' }],
        skip,
        take: limit,
      }),
      this.prisma.material.count({ where }),
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
    return this.prisma.material.findFirst({
      where: { id, lang },
    });
  }

  async findByName(name: string, lang: Language = Language.EN) {
    return this.prisma.material.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        lang,
      },
    });
  }

  async findByCategory(category: string, lang: Language = Language.EN) {
    return this.prisma.material.findMany({
      where: {
        lang,
        category: { equals: category, mode: 'insensitive' },
      },
      orderBy: [{ sortRank: 'asc' }, { name: 'asc' }],
    });
  }

  async findByRarity(rarity: number, lang: Language = Language.EN) {
    return this.prisma.material.findMany({
      where: { lang, rarity },
      orderBy: [{ category: 'asc' }, { sortRank: 'asc' }, { name: 'asc' }],
    });
  }
}
