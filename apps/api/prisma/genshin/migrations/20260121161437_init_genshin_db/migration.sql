-- CreateTable
CREATE TABLE "characters" (
    "id" INTEGER NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "characters_name_key" ON "characters"("name");

-- CreateIndex
CREATE INDEX "characters_elementType_idx" ON "characters"("elementType");

-- CreateIndex
CREATE INDEX "characters_rarity_idx" ON "characters"("rarity");

-- CreateIndex
CREATE INDEX "characters_region_idx" ON "characters"("region");

-- CreateIndex
CREATE INDEX "characters_weaponType_idx" ON "characters"("weaponType");

-- CreateIndex
CREATE INDEX "character_ascension_costs_characterId_idx" ON "character_ascension_costs"("characterId");

-- CreateIndex
CREATE INDEX "character_ascension_costs_phase_idx" ON "character_ascension_costs"("phase");

-- AddForeignKey
ALTER TABLE "character_ascension_costs" ADD CONSTRAINT "character_ascension_costs_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
