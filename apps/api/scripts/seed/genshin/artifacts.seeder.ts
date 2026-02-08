import { GenshinPrismaService } from '../../../src/prisma';
import { readJsonFiles, getDataPath, getLangCode } from './utils';

interface ArtifactData {
  id: number;
  name: string;
  rarityList?: number[];
  effect2Pc?: string;
  effect4Pc?: string;
  flower?: ArtifactPieceData;
  plume?: ArtifactPieceData;
  sands?: ArtifactPieceData;
  goblet?: ArtifactPieceData;
  circlet?: ArtifactPieceData;
}

interface ArtifactPieceData {
  name?: string;
  relicType?: string;
  relicText?: string;
  description?: string;
  story?: string;
}

interface ArtifactPieceWithType extends ArtifactPieceData {
  pieceType: string;
}

export async function seedArtifacts(prisma: GenshinPrismaService) {
  console.log('🌱 Seeding Artifacts...');

  for (const lang of ['English', 'Vietnamese'] as const) {
    const langCode = getLangCode(lang);
    const dataPath = getDataPath(lang, 'artifacts');
    const artifacts = readJsonFiles<ArtifactData>(dataPath);

    if (artifacts.length === 0) {
      console.log(`  ⚠️  No artifacts found for ${lang}`);
      continue;
    }

    const existing = await prisma.artifact.count({ where: { lang: langCode } });
    if (existing > 0) {
      console.log(`  ✓ ${lang} artifacts already seeded (${existing} records)`);
      continue;
    }

    console.log(`  📦 Seeding ${artifacts.length} ${lang} artifacts...`);

    let successCount = 0;
    let skipCount = 0;
    const BATCH_SIZE = 50;

    // Process in batches to avoid transaction timeout
    for (let i = 0; i < artifacts.length; i += BATCH_SIZE) {
      const batch = artifacts.slice(i, i + BATCH_SIZE);

      await prisma.$transaction(
        async (tx) => {
          for (const artifact of batch) {
            const pieces: ArtifactPieceWithType[] = [];
            const pieceTypes = [
              'flower',
              'plume',
              'sands',
              'goblet',
              'circlet',
            ] as const;

            for (const pieceType of pieceTypes) {
              if (artifact[pieceType]) {
                pieces.push({ ...artifact[pieceType]!, pieceType });
              }
            }

            try {
              await tx.artifact.upsert({
                where: {
                  lang_name: {
                    lang: langCode,
                    name: artifact.name,
                  },
                },
                update: {}, // Don't update if exists
                create: {
                  lang: langCode,
                  name: artifact.name,
                  rarityList: artifact.rarityList ?? [4, 5],
                  effect2Pc: artifact.effect2Pc,
                  effect4Pc: artifact.effect4Pc,
                  pieces: {
                    create: pieces.map((piece) => ({
                      pieceType: piece.pieceType,
                      name: piece.name ?? 'Unknown',
                      relicType: piece.relicType ?? 'Unknown',
                      relicText: piece.relicText ?? 'Unknown',
                      description: piece.description ?? '',
                      story: piece.story,
                    })),
                  },
                },
              });
              successCount++;
            } catch (error) {
              skipCount++;
              console.log(`    ⚠️  Skipped duplicate: ${artifact.name}`);
            }
          }
        },
        {
          timeout: 30000, // 30 seconds timeout
        },
      );

      console.log(
        `    Progress: ${Math.min(i + BATCH_SIZE, artifacts.length)}/${artifacts.length}`,
      );
    }

    console.log(
      `  ✓ Seeded ${successCount} ${lang} artifacts (${skipCount} skipped)`,
    );
  }
}
