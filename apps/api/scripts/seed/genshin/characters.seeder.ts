import { GenshinPrismaService } from '../../../src/prisma';
import { readJsonFiles, getDataPath, getLangCode } from './utils';

interface CharacterData {
  id: number;
  name: string;
  title?: string;
  description?: string;
  weaponType?: string;
  weaponText?: string;
  bodyType?: string;
  gender?: string;
  qualityType?: string;
  rarity?: number;
  birthdaymmdd?: string;
  birthday?: string;
  elementType?: string;
  elementText?: string;
  affiliation?: string;
  associationType?: string;
  region?: string;
  substatType?: string;
  substatText?: string;
  constellation?: string;
  cv?: {
    english?: string;
    chinese?: string;
    japanese?: string;
    korean?: string;
  };
  costs?: Record<string, CostItem[]>;
}

interface CostItem {
  id: number;
  name: string;
  count: number;
}

export async function seedCharacters(prisma: GenshinPrismaService) {
  console.log('🌱 Seeding Characters...');

  for (const lang of ['English', 'Vietnamese'] as const) {
    const langCode = getLangCode(lang);
    const dataPath = getDataPath(lang, 'characters');
    const characters = readJsonFiles<CharacterData>(dataPath);

    if (characters.length === 0) {
      console.log(`  ⚠️  No characters found for ${lang}`);
      continue;
    }

    const existing = await prisma.character.count({ where: { lang: langCode } });
    if (existing > 0) {
      console.log(`  ✓ ${lang} characters already seeded (${existing} records)`);
      continue;
    }

    console.log(`  📦 Seeding ${characters.length} ${lang} characters...`);

    let successCount = 0;
    let skipCount = 0;
    const BATCH_SIZE = 50;

    // Process in batches to avoid transaction timeout
    for (let i = 0; i < characters.length; i += BATCH_SIZE) {
      const batch = characters.slice(i, i + BATCH_SIZE);

      await prisma.$transaction(
        async (tx) => {
          for (const character of batch) {
            const ascensionCosts: any[] = [];

            if (character.costs) {
              for (const [phase, items] of Object.entries(character.costs)) {
                for (const item of items) {
                  ascensionCosts.push({
                    phase,
                    itemId: item.id,
                    itemName: item.name,
                    count: item.count,
                  });
                }
              }
            }

            try {
              await tx.character.upsert({
                where: {
                  lang_name: {
                    lang: langCode,
                    name: character.name,
                  },
                },
                update: {}, // Don't update if exists
                create: {
                  lang: langCode,
                  name: character.name,
                  title: character.title ?? '',
                  description: character.description ?? '',
                  weaponType: character.weaponType ?? 'Unknown',
                  weaponText: character.weaponText ?? 'Unknown',
                  bodyType: character.bodyType ?? 'Unknown',
                  gender: character.gender ?? 'Unknown',
                  qualityType: character.qualityType ?? 'Unknown',
                  rarity: character.rarity ?? 4,
                  birthdayMmdd: character.birthdaymmdd,
                  birthday: character.birthday,
                  elementType: character.elementType ?? 'Unknown',
                  elementText: character.elementText ?? 'Unknown',
                  affiliation: character.affiliation ?? 'Unknown',
                  associationType: character.associationType ?? 'Unknown',
                  region: character.region ?? 'Unknown',
                  substatType: character.substatType ?? 'Unknown',
                  substatText: character.substatText ?? 'Unknown',
                  constellation: character.constellation ?? 'Unknown',
                  cvEnglish: character.cv?.english,
                  cvChinese: character.cv?.chinese,
                  cvJapanese: character.cv?.japanese,
                  cvKorean: character.cv?.korean,
                  ascensionCosts: {
                    create: ascensionCosts,
                  },
                },
              });
              successCount++;
            } catch (error) {
              skipCount++;
              console.log(`    ⚠️  Skipped duplicate: ${character.name}`);
            }
          }
        },
        {
          timeout: 30000, // 30 seconds timeout
        },
      );

      console.log(`    Progress: ${Math.min(i + BATCH_SIZE, characters.length)}/${characters.length}`);
    }

    console.log(`  ✓ Seeded ${successCount} ${lang} characters (${skipCount} skipped)`);
  }
}
