import { Injectable } from '@nestjs/common';
import { GenshinPrismaService } from '../../prisma';
import { DomainQueryDto, Language } from '../dto/query.dto';

@Injectable()
export class DomainsService {
  constructor(private readonly prisma: GenshinPrismaService) {}

  async findAll(query: DomainQueryDto) {
    const {
      lang = Language.EN,
      page = 1,
      limit = 20,
      name,
      domainType,
      regionName,
      recommendedLevel,
    } = query;

    const where: any = { lang };

    // Case-insensitive filters
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (domainType)
      where.domainType = { equals: domainType, mode: 'insensitive' };
    if (regionName)
      where.regionName = { equals: regionName, mode: 'insensitive' };
    if (recommendedLevel) where.recommendedLevel = recommendedLevel;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.domain.findMany({
        where,
        include: {
          rewardPreview: true,
          monsterList: true,
        },
        orderBy: { name: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.domain.count({ where }),
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
    return this.prisma.domain.findFirst({
      where: { id, lang },
      include: {
        rewardPreview: true,
        monsterList: true,
      },
    });
  }

  async findByName(name: string, lang: Language = Language.EN) {
    return this.prisma.domain.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        lang,
      },
      include: {
        rewardPreview: true,
        monsterList: true,
      },
    });
  }

  async findByType(domainType: string, lang: Language = Language.EN) {
    return this.prisma.domain.findMany({
      where: {
        lang,
        domainType: { equals: domainType, mode: 'insensitive' },
      },
      include: {
        rewardPreview: true,
        monsterList: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findByRegion(regionName: string, lang: Language = Language.EN) {
    return this.prisma.domain.findMany({
      where: {
        lang,
        regionName: { equals: regionName, mode: 'insensitive' },
      },
      include: {
        rewardPreview: true,
        monsterList: true,
      },
      orderBy: { name: 'asc' },
    });
  }
}
