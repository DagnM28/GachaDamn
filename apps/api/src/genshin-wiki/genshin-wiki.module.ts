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
    CharactersService,
    WeaponsService,
    ArtifactsService,
    MaterialsService,
    DomainsService,
  ],
})
export class GenshinWikiModule {}
