import { Injectable, OnModuleInit } from '@nestjs/common';
import { GenshinPrismaService } from '../prisma';
import { seedGenshinData } from '../../scripts/seed/genshin';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly genshinPrisma: GenshinPrismaService) {}

  async onModuleInit() {
    const shouldSeed = process.env.AUTO_SEED === 'true';

    if (!shouldSeed) {
      console.log('ℹ️  Auto-seeding disabled. Set AUTO_SEED=true to enable.');
      return;
    }

    console.log('🌱 Auto-seeding enabled...');
    await this.seedAll();
  }

  async seedAll() {
    try {
      await seedGenshinData(this.genshinPrisma);
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      // Don't throw - allow app to start even if seeding fails
    }
  }
}
