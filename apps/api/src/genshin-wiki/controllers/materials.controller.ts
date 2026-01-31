import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { MaterialsService } from '../services';
import { MaterialQueryDto, LanguageQueryDto } from '../dto/query.dto';

@Controller('genshin/materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  findAll(@Query() query: MaterialQueryDto) {
    return this.materialsService.findAll(query);
  }

  @Get('category/:category')
  findByCategory(
    @Param('category') category: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.materialsService.findByCategory(category, query.lang);
  }

  @Get('rarity/:rarity')
  findByRarity(
    @Param('rarity', ParseIntPipe) rarity: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.materialsService.findByRarity(rarity, query.lang);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string, @Query() query: LanguageQueryDto) {
    return this.materialsService.findByName(name, query.lang);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.materialsService.findOne(id, query.lang);
  }
}
