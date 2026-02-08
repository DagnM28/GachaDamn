import { Module } from '@nestjs/common';
import {
  GenshinWikiController,
  CharactersController,
  WeaponsController,
  ArtifactsController,
  MaterialsController,
  DomainsController,
} from './controllers';
import {
  CharactersService,
  WeaponsService,
  ArtifactsService,
  MaterialsService,
  DomainsService,
} from './services';
import { MetadataScanner } from '@nestjs/core';

@Module({
  controllers: [
    GenshinWikiController,
    CharactersController,
    WeaponsController,
    ArtifactsController,
    MaterialsController,
    DomainsController,
  ],
  providers: [
    MetadataScanner,
    CharactersService,
    WeaponsService,
    ArtifactsService,
    MaterialsService,
    DomainsService,
  ],
})
export class GenshinWikiModule {}
