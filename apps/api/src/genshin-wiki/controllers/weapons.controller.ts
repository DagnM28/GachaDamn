import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { WeaponsService } from '../services';
import { WeaponQueryDto, LanguageQueryDto } from '../dto/query.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SWAGGER_TAGS } from '../../constants/swagger.constant';

@ApiTags(SWAGGER_TAGS.GENSHIN_WIKI)
@Controller('gi-wiki/weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách tất cả vũ khí',
    description: 'Trả về danh sách vũ khí với các bộ lọc và phân trang',
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
    name: 'weaponType',
    required: false,
    type: String,
    description:
      'Lọc theo loại vũ khí (Sword, Claymore, Polearm, Bow, Catalyst)',
  })
  @ApiQuery({
    name: 'rarity',
    required: false,
    type: Number,
    description: 'Lọc theo độ hiếm (1-5 sao)',
  })
  @ApiResponse({ status: 200, description: 'Danh sách vũ khí' })
  @ApiResponse({ status: 400, description: 'Tham số không hợp lệ' })
  findAll(@Query() query: WeaponQueryDto) {
    return this.weaponsService.findAll(query);
  }

  @Get('type/:weaponType')
  @ApiOperation({
    summary: 'Lấy vũ khí theo loại',
    description: 'Trả về danh sách vũ khí thuộc loại cụ thể',
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
  @ApiResponse({ status: 200, description: 'Danh sách vũ khí theo loại' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy vũ khí' })
  findByType(
    @Param('weaponType') weaponType: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.weaponsService.findByType(weaponType, query.lang);
  }

  @Get('rarity/:rarity')
  @ApiOperation({
    summary: 'Lấy vũ khí theo độ hiếm',
    description: 'Trả về danh sách vũ khí theo số sao (1-5 sao)',
  })
  @ApiParam({
    name: 'rarity',
    description: 'Độ hiếm (1-5 sao)',
    example: 5,
    type: Number,
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Danh sách vũ khí theo độ hiếm' })
  @ApiResponse({ status: 400, description: 'Độ hiếm không hợp lệ' })
  findByRarity(
    @Param('rarity', ParseIntPipe) rarity: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.weaponsService.findByRarity(rarity, query.lang);
  }

  @Get('name/:name')
  @ApiOperation({
    summary: 'Tìm vũ khí theo tên',
    description: 'Trả về thông tin vũ khí dựa trên tên',
  })
  @ApiParam({
    name: 'name',
    description: 'Tên vũ khí',
    example: "Wolf's Gravestone",
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Thông tin vũ khí' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy vũ khí' })
  findByName(@Param('name') name: string, @Query() query: LanguageQueryDto) {
    return this.weaponsService.findByName(name, query.lang);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin vũ khí theo ID',
    description: 'Trả về thông tin chi tiết của vũ khí dựa trên ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của vũ khí',
    example: 1,
    type: Number,
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Thông tin chi tiết vũ khí' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy vũ khí' })
  @ApiResponse({ status: 400, description: 'ID không hợp lệ' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.weaponsService.findOne(id, query.lang);
  }
}
