import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ArtifactsService } from '../services';
import { ArtifactQueryDto, LanguageQueryDto } from '../dto/query.dto';

@Controller('genshin/artifacts')
export class ArtifactsController {
  constructor(private readonly artifactsService: ArtifactsService) {}

  @Get()
  findAll(@Query() query: ArtifactQueryDto) {
    return this.artifactsService.findAll(query);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string, @Query() query: LanguageQueryDto) {
    return this.artifactsService.findByName(name, query.lang);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.artifactsService.findOne(id, query.lang);
  }
}
