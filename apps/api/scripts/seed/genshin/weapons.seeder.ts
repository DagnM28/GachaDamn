import { GenshinPrismaService } from '../../../src/prisma';
import { readJsonFiles, getDataPath, getLangCode } from './utils';

interface WeaponData {
  id: number;
  name: string;
  description?: string;
  descriptionRaw?: string;
  weaponType?: string;
  weaponText?: string;
  rarity?: number;
  story?: string;
  baseAtkValue?: number;
  mainStatType?: string;
  mainStatText?: string;
  baseStatText?: string;
  effectName?: string;
  effectTemplateRaw?: string;
  r1?: RefinementData;
  r2?: RefinementData;
  r3?: RefinementData;
  r4?: RefinementData;
  r5?: RefinementData;
  costs?: Record<string, CostItem[]>;
}

interface RefinementData {
  description: string;
  values?: number[];
}

interface CostItem {
  id: number;
  name: string;
  count: number;
}

export async function seedWeapons(prisma: GenshinPrismaService) {
  console.log('🌱 Seeding Weapons...');

  for (const lang of ['English', 'Vietnamese'] as const) {
    const langCode = getLangCode(lang);
    const dataPath = getDataPath(lang, 'weapons');
    const weapons = readJsonFiles<WeaponData>(dataPath);

    if (weapons.length === 0) {
      console.log(`  ⚠️  No weapons found for ${lang}`);
      continue;
    }

    const existing = await prisma.weapon.count({ where: { lang: langCode } });
    if (existing > 0) {
      console.log(`  ✓ ${lang} weapons already seeded (${existing} records)`);
      continue;
    }

    console.log(`  📦 Seeding ${weapons.length} ${lang} weapons...`);

    let successCount = 0;
    let skipCount = 0;
    const BATCH_SIZE = 50;

    // Process in batches to avoid transaction timeout
    for (let i = 0; i < weapons.length; i += BATCH_SIZE) {
      const batch = weapons.slice(i, i + BATCH_SIZE);

      await prisma.$transaction(
        async (tx) => {
          for (const weapon of batch) {
            const refinements: any[] = [];
            const ascensionCosts: any[] = [];

            // Process refinements
            for (let i = 1; i <= 5; i++) {
              const refinement = weapon[`r${i}` as keyof WeaponData] as
                | RefinementData
                | undefined;
              if (refinement) {
                refinements.push({
                  rank: i,
                  description: refinement.description,
                  values: refinement.values || [],
                });
              }
            }

            // Process ascension costs
            if (weapon.costs) {
              for (const [phase, items] of Object.entries(weapon.costs)) {
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
              await tx.weapon.upsert({
                where: {
                  lang_name: {
                    lang: langCode,
                    name: weapon.name,
                  },
                },
                update: {}, // Don't update if exists
                create: {
                  lang: langCode,
                  name: weapon.name,
                  description: weapon.description ?? '',
                  descriptionRaw: weapon.descriptionRaw ?? '',
                  weaponType: weapon.weaponType ?? 'Unknown',
                  weaponText: weapon.weaponText ?? 'Unknown',
                  rarity: weapon.rarity ?? 3,
                  story: weapon.story,
                  baseAtkValue: weapon.baseAtkValue ?? 0,
                  mainStatType: weapon.mainStatType ?? 'Unknown',
                  mainStatText: weapon.mainStatText ?? 'Unknown',
                  baseStatText: weapon.baseStatText ?? 'Unknown',
                  effectName: weapon.effectName,
                  effectTemplateRaw: weapon.effectTemplateRaw,
                  refinements: {
                    create: refinements,
                  },
                  ascensionCosts: {
                    create: ascensionCosts,
                  },
                },
              });
              successCount++;
            } catch (error) {
              skipCount++;
              console.log(`    ⚠️  Skipped duplicate: ${weapon.name}`);
            }
          }
        },
        {
          timeout: 30000, // 30 seconds timeout
        },
      );

      console.log(
        `    Progress: ${Math.min(i + BATCH_SIZE, weapons.length)}/${weapons.length}`,
      );
    }

    console.log(
      `  ✓ Seeded ${successCount} ${lang} weapons (${skipCount} skipped)`,
    );
  }
}
