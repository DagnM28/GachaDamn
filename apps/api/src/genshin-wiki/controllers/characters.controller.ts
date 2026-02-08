import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { CharactersService } from '../services';
import { CharacterQueryDto, LanguageQueryDto } from '../dto/query.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SWAGGER_TAGS } from '../../constants/swagger.constant';

@ApiTags(SWAGGER_TAGS.GENSHIN_WIKI)
@Controller('gi-wiki/characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách tất cả nhân vật',
    description: 'Trả về danh sách nhân vật với các bộ lọc và phân trang',
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Số trang (mặc định: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Số lượng mỗi trang (mặc định: 20, tối đa: 100)',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Tìm kiếm theo tên',
  })
  @ApiQuery({
    name: 'elementType',
    required: false,
    type: String,
    description:
      'Lọc theo nguyên tố (Pyro, Hydro, Anemo, Electro, Dendro, Cryo, Geo)',
  })
  @ApiQuery({
    name: 'weaponType',
    required: false,
    type: String,
    description:
      'Lọc theo loại vũ khí (Sword, Claymore, Polearm, Bow, Catalyst)',
  })
  @ApiQuery({
    name: 'region',
    required: false,
    type: String,
    description:
      'Lọc theo khu vực (Mondstadt, Liyue, Inazuma, Sumeru, Fontaine, Natlan, Snezhnaya)',
  })
  @ApiQuery({
    name: 'rarity',
    required: false,
    type: Number,
    description: 'Lọc theo độ hiếm (4 hoặc 5 sao)',
  })
  @ApiQuery({
    name: 'bodyType',
    required: false,
    type: String,
    description: 'Lọc theo loại hình thể',
  })
  @ApiQuery({
    name: 'gender',
    required: false,
    type: String,
    description: 'Lọc theo giới tính',
  })
  @ApiResponse({ status: 200, description: 'Danh sách nhân vật' })
  @ApiResponse({ status: 400, description: 'Tham số không hợp lệ' })
  findAll(@Query() query: CharacterQueryDto) {
    return this.charactersService.findAll(query);
  }

  @Get('element/:element')
  @ApiOperation({
    summary: 'Lấy nhân vật theo nguyên tố',
    description: 'Trả về danh sách nhân vật thuộc nguyên tố cụ thể',
  })
  @ApiParam({
    name: 'element',
    description:
      'Tên nguyên tố (Pyro, Hydro, Anemo, Electro, Dendro, Cryo, Geo)',
    example: 'Pyro',
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({
    status: 200,
    description: 'Danh sách nhân vật theo nguyên tố',
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân vật' })
  findByElement(
    @Param('element') element: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.charactersService.findByElement(element, query.lang);
  }

  @Get('rarity/:rarity')
  @ApiOperation({
    summary: 'Lấy nhân vật theo độ hiếm',
    description: 'Trả về danh sách nhân vật theo số sao (4 hoặc 5 sao)',
  })
  @ApiParam({
    name: 'rarity',
    description: 'Độ hiếm (4 hoặc 5)',
    example: 5,
    type: Number,
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Danh sách nhân vật theo độ hiếm' })
  @ApiResponse({ status: 400, description: 'Độ hiếm không hợp lệ' })
  findByRarity(
    @Param('rarity', ParseIntPipe) rarity: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.charactersService.findByRarity(rarity, query.lang);
  }

  @Get('region/:region')
  @ApiOperation({
    summary: 'Lấy nhân vật theo khu vực',
    description: 'Trả về danh sách nhân vật thuộc khu vực cụ thể',
  })
  @ApiParam({
    name: 'region',
    description:
      'Tên khu vực (Mondstadt, Liyue, Inazuma, Sumeru, Fontaine, Natlan, Snezhnaya)',
    example: 'Mondstadt',
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Danh sách nhân vật theo khu vực' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân vật' })
  findByRegion(
    @Param('region') region: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.charactersService.findByRegion(region, query.lang);
  }

  @Get('weapon-type/:weaponType')
  @ApiOperation({
    summary: 'Lấy nhân vật theo loại vũ khí',
    description: 'Trả về danh sách nhân vật sử dụng loại vũ khí cụ thể',
  })
  @ApiParam({
    name: 'weaponType',
    description: 'Loại vũ khí (Sword, Claymore, Polearm, Bow, Catalyst)',
    example: 'Sword',
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({
    status: 200,
    description: 'Danh sách nhân vật theo loại vũ khí',
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân vật' })
  findByWeaponType(
    @Param('weaponType') weaponType: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.charactersService.findByWeaponType(weaponType, query.lang);
  }

  @Get('name/:name')
  @ApiOperation({
    summary: 'Tìm nhân vật theo tên',
    description: 'Trả về thông tin nhân vật dựa trên tên',
  })
  @ApiParam({ name: 'name', description: 'Tên nhân vật', example: 'Diluc' })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Thông tin nhân vật' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân vật' })
  findByName(@Param('name') name: string, @Query() query: LanguageQueryDto) {
    return this.charactersService.findByName(name, query.lang);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin nhân vật theo ID',
    description: 'Trả về thông tin chi tiết của nhân vật dựa trên ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của nhân vật',
    example: 1,
    type: Number,
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Thông tin chi tiết nhân vật' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân vật' })
  @ApiResponse({ status: 400, description: 'ID không hợp lệ' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.charactersService.findOne(id, query.lang);
  }
}
