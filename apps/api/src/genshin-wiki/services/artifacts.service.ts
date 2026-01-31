import { Injectable } from '@nestjs/common';
import { GenshinPrismaService } from '../../prisma';
import { ArtifactQueryDto, Language } from '../dto/query.dto';

@Injectable()
export class ArtifactsService {
  constructor(private readonly prisma: GenshinPrismaService) {}

  async findAll(query: ArtifactQueryDto) {
    const { lang = Language.EN, page = 1, limit = 20, name } = query;

    const where: any = { lang };

    // Case-insensitive filter
    if (name) where.name = { contains: name, mode: 'insensitive' };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.artifact.findMany({
        where,
        include: { pieces: true },
        orderBy: { name: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.artifact.count({ where }),
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
    return this.prisma.artifact.findFirst({
      where: { id, lang },
      include: { pieces: true },
    });
  }

  async findByName(name: string, lang: Language = Language.EN) {
    return this.prisma.artifact.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        lang,
      },
      include: { pieces: true },
    });
  }
}
