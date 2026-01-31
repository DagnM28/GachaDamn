import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { CharactersService } from '../services';
import { CharacterQueryDto, LanguageQueryDto } from '../dto/query.dto';

@Controller('genshin/characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  findAll(@Query() query: CharacterQueryDto) {
    return this.charactersService.findAll(query);
  }

  @Get('element/:element')
  findByElement(
    @Param('element') element: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.charactersService.findByElement(element, query.lang);
  }

  @Get('rarity/:rarity')
  findByRarity(
    @Param('rarity', ParseIntPipe) rarity: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.charactersService.findByRarity(rarity, query.lang);
  }

  @Get('region/:region')
  findByRegion(
    @Param('region') region: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.charactersService.findByRegion(region, query.lang);
  }

  @Get('weapon-type/:weaponType')
  findByWeaponType(
    @Param('weaponType') weaponType: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.charactersService.findByWeaponType(weaponType, query.lang);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string, @Query() query: LanguageQueryDto) {
    return this.charactersService.findByName(name, query.lang);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.charactersService.findOne(id, query.lang);
  }
}
