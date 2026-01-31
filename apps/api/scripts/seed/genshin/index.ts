import { GenshinPrismaService } from '../../../src/prisma';
import { seedMaterials } from './materials.seeder';
import { seedArtifacts } from './artifacts.seeder';
import { seedCharacters } from './characters.seeder';
import { seedWeapons } from './weapons.seeder';
import { seedDomains } from './domains.seeder';

export async function seedGenshinData(prisma: GenshinPrismaService) {
  console.log('\n🎮 Starting Genshin Impact data seeding...\n');

  try {
    // Seed in order: independent entities first, then dependent ones
    await seedMaterials(prisma);
    await seedArtifacts(prisma);
    await seedCharacters(prisma);
    await seedWeapons(prisma);
    await seedDomains(prisma);

    console.log('\n✅ Genshin Impact data seeding completed!\n');
  } catch (error) {
    console.error('\n❌ Error seeding Genshin data:', error);
    throw error;
  }
}
