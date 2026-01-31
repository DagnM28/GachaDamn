import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { DomainsService } from '../services';
import { DomainQueryDto, LanguageQueryDto } from '../dto/query.dto';

@Controller('genshin/domains')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Get()
  findAll(@Query() query: DomainQueryDto) {
    return this.domainsService.findAll(query);
  }

  @Get('type/:domainType')
  findByType(
    @Param('domainType') domainType: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.domainsService.findByType(domainType, query.lang);
  }

  @Get('region/:regionName')
  findByRegion(
    @Param('regionName') regionName: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.domainsService.findByRegion(regionName, query.lang);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string, @Query() query: LanguageQueryDto) {
    return this.domainsService.findByName(name, query.lang);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.domainsService.findOne(id, query.lang);
  }
}
