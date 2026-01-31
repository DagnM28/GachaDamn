import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { WeaponsService } from '../services';
import { WeaponQueryDto, LanguageQueryDto } from '../dto/query.dto';

@Controller('genshin/weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get()
  findAll(@Query() query: WeaponQueryDto) {
    return this.weaponsService.findAll(query);
  }

  @Get('type/:weaponType')
  findByType(
    @Param('weaponType') weaponType: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.weaponsService.findByType(weaponType, query.lang);
  }

  @Get('rarity/:rarity')
  findByRarity(
    @Param('rarity', ParseIntPipe) rarity: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.weaponsService.findByRarity(rarity, query.lang);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string, @Query() query: LanguageQueryDto) {
    return this.weaponsService.findByName(name, query.lang);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.weaponsService.findOne(id, query.lang);
  }
}
