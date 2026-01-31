-- CreateTable
CREATE TABLE "adventure_ranks" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "exp" INTEGER NOT NULL,
    "unlockDescription" TEXT NOT NULL,
    "reward" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adventure_ranks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artifacts" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rarityList" JSONB NOT NULL,
    "effect2Pc" TEXT,
    "effect4Pc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artifacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artifact_pieces" (
    "id" TEXT NOT NULL,
    "artifactId" INTEGER NOT NULL,
    "pieceType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relicType" TEXT NOT NULL,
    "relicText" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "story" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "artifact_pieces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weaponType" TEXT NOT NULL,
    "weaponText" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "qualityType" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "birthdayMmdd" TEXT,
    "birthday" TEXT,
    "elementType" TEXT NOT NULL,
    "elementText" TEXT NOT NULL,
    "affiliation" TEXT NOT NULL,
    "associationType" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "substatType" TEXT NOT NULL,
    "substatText" TEXT NOT NULL,
    "constellation" TEXT NOT NULL,
    "cvEnglish" TEXT,
    "cvChinese" TEXT,
    "cvJapanese" TEXT,
    "cvKorean" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_ascension_costs" (
    "id" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,
    "phase" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemName" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "character_ascension_costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "constellations" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,
    "characterName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "constellations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "constellation_details" (
    "id" TEXT NOT NULL,
    "constellationId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionRaw" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "constellation_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domains" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,
    "regionName" TEXT NOT NULL,
    "entranceId" INTEGER NOT NULL,
    "entranceName" TEXT NOT NULL,
    "domainType" TEXT NOT NULL,
    "domainText" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recommendedLevel" INTEGER NOT NULL,
    "recommendedElements" JSONB NOT NULL,
    "unlockRank" INTEGER NOT NULL,
    "disorder" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domain_rewards" (
    "id" TEXT NOT NULL,
    "domainId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemName" TEXT NOT NULL,
    "rarity" INTEGER,
    "count" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "domain_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domain_monsters" (
    "id" TEXT NOT NULL,
    "domainId" INTEGER NOT NULL,
    "monsterId" INTEGER NOT NULL,
    "monsterName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "domain_monsters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enemies" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "monsterId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "specialNames" JSONB NOT NULL,
    "monsterType" TEXT NOT NULL,
    "enemyType" TEXT NOT NULL,
    "categoryType" TEXT NOT NULL,
    "categoryText" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rewardPreview" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enemies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foods" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "foodtype" TEXT NOT NULL,
    "filterType" TEXT NOT NULL,
    "filterText" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_qualities" (
    "id" TEXT NOT NULL,
    "foodId" INTEGER NOT NULL,
    "quality" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "food_qualities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_ingredients" (
    "id" TEXT NOT NULL,
    "foodId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "food_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materials" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "sortRank" INTEGER,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "typeText" TEXT NOT NULL,
    "sources" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outfits" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL,
    "characterId" INTEGER NOT NULL,
    "characterName" TEXT NOT NULL,
    "source" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outfits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talents" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,
    "characterName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "talents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talent_combats" (
    "id" TEXT NOT NULL,
    "talentId" INTEGER NOT NULL,
    "combatType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionRaw" TEXT NOT NULL,
    "flavorText" TEXT,
    "attributes" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "talent_combats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talent_passives" (
    "id" TEXT NOT NULL,
    "talentId" INTEGER NOT NULL,
    "passiveType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionRaw" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "talent_passives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talent_costs" (
    "id" TEXT NOT NULL,
    "talentId" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemName" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "talent_costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voiceovers" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,
    "characterName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voiceovers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voiceover_lines" (
    "id" TEXT NOT NULL,
    "voiceoverId" INTEGER NOT NULL,
    "voicelineId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "voicelineType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "voicefile" TEXT NOT NULL,
    "hasUnlockConditions" BOOLEAN NOT NULL,
    "unlockConditions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "voiceover_lines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapons" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionRaw" TEXT NOT NULL,
    "weaponType" TEXT NOT NULL,
    "weaponText" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "story" TEXT,
    "baseAtkValue" DOUBLE PRECISION NOT NULL,
    "mainStatType" TEXT NOT NULL,
    "mainStatText" TEXT NOT NULL,
    "baseStatText" TEXT NOT NULL,
    "effectName" TEXT,
    "effectTemplateRaw" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapon_refinements" (
    "id" TEXT NOT NULL,
    "weaponId" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "values" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weapon_refinements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapon_ascension_costs" (
    "id" TEXT NOT NULL,
    "weaponId" INTEGER NOT NULL,
    "phase" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemName" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weapon_ascension_costs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "adventure_ranks_lang_idx" ON "adventure_ranks"("lang");

-- CreateIndex
CREATE UNIQUE INDEX "adventure_ranks_lang_name_key" ON "adventure_ranks"("lang", "name");

-- CreateIndex
CREATE INDEX "artifacts_lang_idx" ON "artifacts"("lang");

-- CreateIndex
CREATE UNIQUE INDEX "artifacts_lang_name_key" ON "artifacts"("lang", "name");

-- CreateIndex
CREATE INDEX "artifact_pieces_artifactId_idx" ON "artifact_pieces"("artifactId");

-- CreateIndex
CREATE INDEX "artifact_pieces_pieceType_idx" ON "artifact_pieces"("pieceType");

-- CreateIndex
CREATE INDEX "characters_lang_idx" ON "characters"("lang");

-- CreateIndex
CREATE INDEX "characters_lang_elementType_idx" ON "characters"("lang", "elementType");

-- CreateIndex
CREATE INDEX "characters_lang_rarity_idx" ON "characters"("lang", "rarity");

-- CreateIndex
CREATE INDEX "characters_lang_region_idx" ON "characters"("lang", "region");

-- CreateIndex
CREATE INDEX "characters_lang_weaponType_idx" ON "characters"("lang", "weaponType");

-- CreateIndex
CREATE UNIQUE INDEX "characters_lang_name_key" ON "characters"("lang", "name");

-- CreateIndex
CREATE INDEX "character_ascension_costs_characterId_idx" ON "character_ascension_costs"("characterId");

-- CreateIndex
CREATE INDEX "character_ascension_costs_phase_idx" ON "character_ascension_costs"("phase");

-- CreateIndex
CREATE INDEX "constellations_lang_idx" ON "constellations"("lang");

-- CreateIndex
CREATE INDEX "constellations_lang_characterName_idx" ON "constellations"("lang", "characterName");

-- CreateIndex
CREATE UNIQUE INDEX "constellations_lang_characterId_key" ON "constellations"("lang", "characterId");

-- CreateIndex
CREATE INDEX "constellation_details_constellationId_idx" ON "constellation_details"("constellationId");

-- CreateIndex
CREATE INDEX "constellation_details_level_idx" ON "constellation_details"("level");

-- CreateIndex
CREATE UNIQUE INDEX "constellation_details_constellationId_level_key" ON "constellation_details"("constellationId", "level");

-- CreateIndex
CREATE INDEX "domains_lang_idx" ON "domains"("lang");

-- CreateIndex
CREATE INDEX "domains_lang_domainType_idx" ON "domains"("lang", "domainType");

-- CreateIndex
CREATE INDEX "domains_lang_regionName_idx" ON "domains"("lang", "regionName");

-- CreateIndex
CREATE INDEX "domains_lang_recommendedLevel_idx" ON "domains"("lang", "recommendedLevel");

-- CreateIndex
CREATE UNIQUE INDEX "domains_lang_name_key" ON "domains"("lang", "name");

-- CreateIndex
CREATE INDEX "domain_rewards_domainId_idx" ON "domain_rewards"("domainId");

-- CreateIndex
CREATE INDEX "domain_monsters_domainId_idx" ON "domain_monsters"("domainId");

-- CreateIndex
CREATE INDEX "enemies_lang_idx" ON "enemies"("lang");

-- CreateIndex
CREATE INDEX "enemies_lang_enemyType_idx" ON "enemies"("lang", "enemyType");

-- CreateIndex
CREATE INDEX "enemies_lang_categoryType_idx" ON "enemies"("lang", "categoryType");

-- CreateIndex
CREATE INDEX "enemies_lang_monsterType_idx" ON "enemies"("lang", "monsterType");

-- CreateIndex
CREATE UNIQUE INDEX "enemies_lang_name_key" ON "enemies"("lang", "name");

-- CreateIndex
CREATE INDEX "foods_lang_idx" ON "foods"("lang");

-- CreateIndex
CREATE INDEX "foods_lang_foodtype_idx" ON "foods"("lang", "foodtype");

-- CreateIndex
CREATE INDEX "foods_lang_rarity_idx" ON "foods"("lang", "rarity");

-- CreateIndex
CREATE UNIQUE INDEX "foods_lang_name_key" ON "foods"("lang", "name");

-- CreateIndex
CREATE INDEX "food_qualities_foodId_idx" ON "food_qualities"("foodId");

-- CreateIndex
CREATE INDEX "food_qualities_quality_idx" ON "food_qualities"("quality");

-- CreateIndex
CREATE INDEX "food_ingredients_foodId_idx" ON "food_ingredients"("foodId");

-- CreateIndex
CREATE INDEX "materials_lang_idx" ON "materials"("lang");

-- CreateIndex
CREATE INDEX "materials_lang_category_idx" ON "materials"("lang", "category");

-- CreateIndex
CREATE INDEX "materials_lang_rarity_idx" ON "materials"("lang", "rarity");

-- CreateIndex
CREATE UNIQUE INDEX "materials_lang_name_key" ON "materials"("lang", "name");

-- CreateIndex
CREATE INDEX "outfits_lang_idx" ON "outfits"("lang");

-- CreateIndex
CREATE INDEX "outfits_lang_characterId_idx" ON "outfits"("lang", "characterId");

-- CreateIndex
CREATE INDEX "outfits_lang_characterName_idx" ON "outfits"("lang", "characterName");

-- CreateIndex
CREATE UNIQUE INDEX "outfits_lang_name_key" ON "outfits"("lang", "name");

-- CreateIndex
CREATE INDEX "talents_lang_idx" ON "talents"("lang");

-- CreateIndex
CREATE INDEX "talents_lang_characterName_idx" ON "talents"("lang", "characterName");

-- CreateIndex
CREATE UNIQUE INDEX "talents_lang_characterId_key" ON "talents"("lang", "characterId");

-- CreateIndex
CREATE INDEX "talent_combats_talentId_idx" ON "talent_combats"("talentId");

-- CreateIndex
CREATE UNIQUE INDEX "talent_combats_talentId_combatType_key" ON "talent_combats"("talentId", "combatType");

-- CreateIndex
CREATE INDEX "talent_passives_talentId_idx" ON "talent_passives"("talentId");

-- CreateIndex
CREATE UNIQUE INDEX "talent_passives_talentId_passiveType_key" ON "talent_passives"("talentId", "passiveType");

-- CreateIndex
CREATE INDEX "talent_costs_talentId_idx" ON "talent_costs"("talentId");

-- CreateIndex
CREATE INDEX "talent_costs_level_idx" ON "talent_costs"("level");

-- CreateIndex
CREATE INDEX "voiceovers_lang_idx" ON "voiceovers"("lang");

-- CreateIndex
CREATE INDEX "voiceovers_lang_characterName_idx" ON "voiceovers"("lang", "characterName");

-- CreateIndex
CREATE UNIQUE INDEX "voiceovers_lang_characterId_key" ON "voiceovers"("lang", "characterId");

-- CreateIndex
CREATE INDEX "voiceover_lines_voiceoverId_idx" ON "voiceover_lines"("voiceoverId");

-- CreateIndex
CREATE INDEX "voiceover_lines_voicelineId_idx" ON "voiceover_lines"("voicelineId");

-- CreateIndex
CREATE INDEX "weapons_lang_idx" ON "weapons"("lang");

-- CreateIndex
CREATE INDEX "weapons_lang_weaponType_idx" ON "weapons"("lang", "weaponType");

-- CreateIndex
CREATE INDEX "weapons_lang_rarity_idx" ON "weapons"("lang", "rarity");

-- CreateIndex
CREATE UNIQUE INDEX "weapons_lang_name_key" ON "weapons"("lang", "name");

-- CreateIndex
CREATE INDEX "weapon_refinements_weaponId_idx" ON "weapon_refinements"("weaponId");

-- CreateIndex
CREATE INDEX "weapon_refinements_rank_idx" ON "weapon_refinements"("rank");

-- CreateIndex
CREATE INDEX "weapon_ascension_costs_weaponId_idx" ON "weapon_ascension_costs"("weaponId");

-- CreateIndex
CREATE INDEX "weapon_ascension_costs_phase_idx" ON "weapon_ascension_costs"("phase");

-- AddForeignKey
ALTER TABLE "artifact_pieces" ADD CONSTRAINT "artifact_pieces_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "artifacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_ascension_costs" ADD CONSTRAINT "character_ascension_costs_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "constellation_details" ADD CONSTRAINT "constellation_details_constellationId_fkey" FOREIGN KEY ("constellationId") REFERENCES "constellations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain_rewards" ADD CONSTRAINT "domain_rewards_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain_monsters" ADD CONSTRAINT "domain_monsters_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_qualities" ADD CONSTRAINT "food_qualities_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_ingredients" ADD CONSTRAINT "food_ingredients_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talent_combats" ADD CONSTRAINT "talent_combats_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "talents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talent_passives" ADD CONSTRAINT "talent_passives_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "talents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talent_costs" ADD CONSTRAINT "talent_costs_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "talents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voiceover_lines" ADD CONSTRAINT "voiceover_lines_voiceoverId_fkey" FOREIGN KEY ("voiceoverId") REFERENCES "voiceovers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_refinements" ADD CONSTRAINT "weapon_refinements_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "weapons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_ascension_costs" ADD CONSTRAINT "weapon_ascension_costs_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "weapons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
