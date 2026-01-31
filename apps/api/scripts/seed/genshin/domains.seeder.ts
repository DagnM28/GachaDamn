import { GenshinPrismaService } from '../../../src/prisma';
import { readJsonFiles, getDataPath, getLangCode } from './utils';

interface DomainData {
  id: number;
  name: string;
  regionId?: number;
  regionName?: string;
  entranceId?: number;
  entranceName?: string;
  domainType?: string;
  domainText?: string;
  description?: string;
  recommendedLevel?: number;
  recommendedElements?: string[];
  unlockRank?: number;
  disorder?: string[];
  rewardPreview?: RewardItem[];
  monsterList?: MonsterItem[];
}

interface RewardItem {
  id: number;
  name: string;
  rarity?: number;
  count?: number;
}

interface MonsterItem {
  id: number;
  name: string;
}

export async function seedDomains(prisma: GenshinPrismaService) {
  console.log('🌱 Seeding Domains...');

  for (const lang of ['English', 'Vietnamese'] as const) {
    const langCode = getLangCode(lang);
    const dataPath = getDataPath(lang, 'domains');
    const domains = readJsonFiles<DomainData>(dataPath);

    if (domains.length === 0) {
      console.log(`  ⚠️  No domains found for ${lang}`);
      continue;
    }

    const existing = await prisma.domain.count({ where: { lang: langCode } });
    if (existing > 0) {
      console.log(`  ✓ ${lang} domains already seeded (${existing} records)`);
      continue;
    }

    console.log(`  📦 Seeding ${domains.length} ${lang} domains...`);

    let successCount = 0;
    let skipCount = 0;
    const BATCH_SIZE = 50;

    // Process in batches to avoid transaction timeout
    for (let i = 0; i < domains.length; i += BATCH_SIZE) {
      const batch = domains.slice(i, i + BATCH_SIZE);

      await prisma.$transaction(
        async (tx) => {
          for (const domain of batch) {
            try {
              await tx.domain.upsert({
                where: {
                  lang_name: {
                    lang: langCode,
                    name: domain.name,
                  },
                },
                update: {}, // Don't update if exists
                create: {
                  lang: langCode,
                  name: domain.name,
                  regionId: domain.regionId ?? 0,
                  regionName: domain.regionName ?? 'Unknown',
                  entranceId: domain.entranceId ?? 0,
                  entranceName: domain.entranceName ?? 'Unknown',
                  domainType: domain.domainType ?? 'Unknown',
                  domainText: domain.domainText ?? 'Unknown',
                  description: domain.description ?? '',
                  recommendedLevel: domain.recommendedLevel ?? 1,
                  recommendedElements: domain.recommendedElements || [],
                  unlockRank: domain.unlockRank ?? 1,
                  disorder: domain.disorder || [],
                  rewardPreview: {
                    create: (domain.rewardPreview || []).map((reward) => ({
                      itemId: reward.id,
                      itemName: reward.name,
                      rarity: reward.rarity,
                      count: reward.count,
                    })),
                  },
                  monsterList: {
                    create: (domain.monsterList || []).map((monster) => ({
                      monsterId: monster.id,
                      monsterName: monster.name,
                    })),
                  },
                },
              });
              successCount++;
            } catch (error) {
              skipCount++;
              console.log(`    ⚠️  Skipped duplicate: ${domain.name}`);
            }
          }
        },
        {
          timeout: 30000, // 30 seconds timeout
        },
      );

      console.log(`    Progress: ${Math.min(i + BATCH_SIZE, domains.length)}/${domains.length}`);
    }

    console.log(`  ✓ Seeded ${successCount} ${lang} domains (${skipCount} skipped)`);
  }
}
