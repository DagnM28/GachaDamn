import { GenshinPrismaService } from '../../../src/prisma';
import { readJsonFiles, getDataPath, getLangCode } from './utils';

interface MaterialData {
  id: number;
  name: string;
  rarity?: number;
  sortRank?: number;
  description: string;
  category: string;
  typeText?: string;
  sources: string[];
}

export async function seedMaterials(prisma: GenshinPrismaService) {
  console.log('🌱 Seeding Materials...');

  for (const lang of ['English', 'Vietnamese'] as const) {
    const langCode = getLangCode(lang);
    const dataPath = getDataPath(lang, 'materials');
    const materials = readJsonFiles<MaterialData>(dataPath);

    if (materials.length === 0) {
      console.log(`  ⚠️  No materials found for ${lang}`);
      continue;
    }

    const existing = await prisma.material.count({ where: { lang: langCode } });
    if (existing > 0) {
      console.log(`  ✓ ${lang} materials already seeded (${existing} records)`);
      continue;
    }

    console.log(`  📦 Seeding ${materials.length} ${lang} materials...`);

    let successCount = 0;
    let skipCount = 0;
    const BATCH_SIZE = 100;

    // Process in batches to avoid transaction timeout
    for (let i = 0; i < materials.length; i += BATCH_SIZE) {
      const batch = materials.slice(i, i + BATCH_SIZE);
      
      await prisma.$transaction(
        async (tx) => {
          for (const material of batch) {
            try {
              await tx.material.upsert({
                where: {
                  lang_name: {
                    lang: langCode,
                    name: material.name,
                  },
                },
                update: {}, // Don't update if exists
                create: {
                  lang: langCode,
                  name: material.name,
                  rarity: material.rarity ?? 1,
                  sortRank: material.sortRank,
                  description: material.description,
                  category: material.category,
                  typeText: material.typeText ?? 'Unknown',
                  sources: material.sources,
                },
              });
              successCount++;
            } catch (error) {
              skipCount++;
              console.log(`    ⚠️  Skipped duplicate: ${material.name}`);
            }
          }
        },
        {
          timeout: 30000, // 30 seconds timeout
        },
      );

      console.log(`    Progress: ${Math.min(i + BATCH_SIZE, materials.length)}/${materials.length}`);
    }

    console.log(`  ✓ Seeded ${successCount} ${lang} materials (${skipCount} skipped)`);
  }
}
