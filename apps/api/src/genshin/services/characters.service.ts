import { Injectable, NotFoundException } from '@nestjs/common';
import { GenshinPrismaService } from '../../prisma/genshin.service';
import { QueryCharactersDto } from '../dto/query-characters.dto';
import {
  CharacterResponseDto,
  CharacterDetailResponseDto,
  PaginatedCharactersResponseDto,
} from '../dto/character-response.dto';

@Injectable()
export class CharactersService {
  constructor(private readonly prisma: GenshinPrismaService) {}

  async findAll(
    query: QueryCharactersDto,
  ): Promise<PaginatedCharactersResponseDto> {
    const {
      lang = 'en',
      elementType,
      weaponType,
      rarity,
      region,
      page = 1,
      limit = 20,
      search,
    } = query;

    // Build where clause
    const where: any = {};
    if (elementType) where.elementType = elementType;
    if (weaponType) where.weaponType = weaponType;
    if (rarity) where.rarity = rarity;
    if (region) where.region = region;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Query based on language
    let data: any[];
    let total: number;

    if (lang === 'vn') {
      [data, total] = await Promise.all([
        this.prisma.characterVN.findMany({
          where,
          skip,
          take: limit,
          orderBy: { id: 'asc' },
        }),
        this.prisma.characterVN.count({ where }),
      ]);
    } else {
      [data, total] = await Promise.all([
        this.prisma.characterEN.findMany({
          where,
          skip,
          take: limit,
          orderBy: { id: 'asc' },
        }),
        this.prisma.characterEN.count({ where }),
      ]);
    }

    return {
      data: data as CharacterResponseDto[],
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(
    id: number,
    lang: 'en' | 'vn' = 'en',
  ): Promise<CharacterDetailResponseDto> {
    let character: any;

    if (lang === 'vn') {
      character = await this.prisma.characterVN.findUnique({
        where: { id },
        include: {
          ascensionCosts: {
            orderBy: { phase: 'asc' },
          },
        },
      });
    } else {
      character = await this.prisma.characterEN.findUnique({
        where: { id },
        include: {
          ascensionCosts: {
            orderBy: { phase: 'asc' },
          },
        },
      });
    }

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }

    return character as CharacterDetailResponseDto;
  }

  async findByName(
    name: string,
    lang: 'en' | 'vn' = 'en',
  ): Promise<CharacterDetailResponseDto> {
    let character: any;

    if (lang === 'vn') {
      character = await this.prisma.characterVN.findUnique({
        where: { name },
        include: {
          ascensionCosts: {
            orderBy: { phase: 'asc' },
          },
        },
      });
    } else {
      character = await this.prisma.characterEN.findUnique({
        where: { name },
        include: {
          ascensionCosts: {
            orderBy: { phase: 'asc' },
          },
        },
      });
    }

    if (!character) {
      throw new NotFoundException(`Character with name "${name}" not found`);
    }

    return character as CharacterDetailResponseDto;
  }

  async getStats(lang: 'en' | 'vn' = 'en') {
    let total: number;
    let byRarity: any[];
    let byElement: any[];
    let byWeapon: any[];
    let byRegion: any[];

    if (lang === 'vn') {
      [total, byRarity, byElement, byWeapon, byRegion] = await Promise.all([
        this.prisma.characterVN.count(),
        this.prisma.characterVN.groupBy({
          by: ['rarity'],
          _count: true,
        }),
        this.prisma.characterVN.groupBy({
          by: ['elementType'],
          _count: true,
        }),
        this.prisma.characterVN.groupBy({
          by: ['weaponType'],
          _count: true,
        }),
        this.prisma.characterVN.groupBy({
          by: ['region'],
          _count: true,
        }),
      ]);
    } else {
      [total, byRarity, byElement, byWeapon, byRegion] = await Promise.all([
        this.prisma.characterEN.count(),
        this.prisma.characterEN.groupBy({
          by: ['rarity'],
          _count: true,
        }),
        this.prisma.characterEN.groupBy({
          by: ['elementType'],
          _count: true,
        }),
        this.prisma.characterEN.groupBy({
          by: ['weaponType'],
          _count: true,
        }),
        this.prisma.characterEN.groupBy({
          by: ['region'],
          _count: true,
        }),
      ]);
    }

    return {
      total,
      byRarity: byRarity.map((item) => ({
        rarity: item.rarity,
        count: item._count,
      })),
      byElement: byElement.map((item) => ({
        element: item.elementType,
        count: item._count,
      })),
      byWeapon: byWeapon.map((item) => ({
        weapon: item.weaponType,
        count: item._count,
      })),
      byRegion: byRegion.map((item) => ({
        region: item.region,
        count: item._count,
      })),
    };
  }
}
