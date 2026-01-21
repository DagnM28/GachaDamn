import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CharactersService } from '../services/characters.service';
import { QueryCharactersDto } from '../dto/query-characters.dto';

@Controller('genshin/characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: QueryCharactersDto) {
    return this.charactersService.findAll(query);
  }

  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats(@Query('lang') lang: 'en' | 'vn' = 'en') {
    return this.charactersService.getStats(lang);
  }

  @Get('by-name/:name')
  @HttpCode(HttpStatus.OK)
  async findByName(
    @Param('name') name: string,
    @Query('lang') lang: 'en' | 'vn' = 'en',
  ) {
    return this.charactersService.findByName(name, lang);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('lang') lang: 'en' | 'vn' = 'en',
  ) {
    return this.charactersService.findOne(id, lang);
  }
}
