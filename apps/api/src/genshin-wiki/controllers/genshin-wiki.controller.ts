import { Controller, Get } from '@nestjs/common';
import { version } from '../../../package.json';

@Controller('genshin')
export class GenshinWikiController {
  constructor() {}

  @Get()
  welcome() {
    return {
      message: 'Welcome to Genshin Wiki API!',
      version: version,
      endpoints: {
        characters: '/api/genshin/characters',
        weapons: '/api/genshin/weapons',
        artifacts: '/api/genshin/artifacts',
        materials: '/api/genshin/materials',
        domains: '/api/genshin/domains',
      },
    };
  }
}
