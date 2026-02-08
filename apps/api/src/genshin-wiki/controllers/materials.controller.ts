import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { MaterialsService } from '../services';
import { MaterialQueryDto, LanguageQueryDto } from '../dto/query.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SWAGGER_TAGS } from '../../constants/swagger.constant';

@ApiTags(SWAGGER_TAGS.GENSHIN_WIKI)
@Controller('gi-wiki/materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách tất cả nguyên liệu',
    description: 'Trả về danh sách nguyên liệu với các bộ lọc và phân trang',
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
    name: 'category',
    required: false,
    type: String,
    description: 'Lọc theo danh mục',
  })
  @ApiQuery({
    name: 'rarity',
    required: false,
    type: Number,
    description: 'Lọc theo độ hiếm (1-5 sao)',
  })
  @ApiResponse({ status: 200, description: 'Danh sách nguyên liệu' })
  @ApiResponse({ status: 400, description: 'Tham số không hợp lệ' })
  findAll(@Query() query: MaterialQueryDto) {
    return this.materialsService.findAll(query);
  }

  @Get('category/:category')
  @ApiOperation({
    summary: 'Lấy nguyên liệu theo danh mục',
    description: 'Trả về danh sách nguyên liệu thuộc danh mục cụ thể',
  })
  @ApiParam({
    name: 'category',
    description: 'Danh mục nguyên liệu',
    example: 'Character Ascension Material',
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({
    status: 200,
    description: 'Danh sách nguyên liệu theo danh mục',
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nguyên liệu' })
  findByCategory(
    @Param('category') category: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.materialsService.findByCategory(category, query.lang);
  }

  @Get('rarity/:rarity')
  @ApiOperation({
    summary: 'Lấy nguyên liệu theo độ hiếm',
    description: 'Trả về danh sách nguyên liệu theo số sao (1-5 sao)',
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
  @ApiResponse({
    status: 200,
    description: 'Danh sách nguyên liệu theo độ hiếm',
  })
  @ApiResponse({ status: 400, description: 'Độ hiếm không hợp lệ' })
  findByRarity(
    @Param('rarity', ParseIntPipe) rarity: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.materialsService.findByRarity(rarity, query.lang);
  }

  @Get('name/:name')
  @ApiOperation({
    summary: 'Tìm nguyên liệu theo tên',
    description: 'Trả về thông tin nguyên liệu dựa trên tên',
  })
  @ApiParam({ name: 'name', description: 'Tên nguyên liệu', example: 'Mora' })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Thông tin nguyên liệu' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nguyên liệu' })
  findByName(@Param('name') name: string, @Query() query: LanguageQueryDto) {
    return this.materialsService.findByName(name, query.lang);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin nguyên liệu theo ID',
    description: 'Trả về thông tin chi tiết của nguyên liệu dựa trên ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của nguyên liệu',
    example: 1,
    type: Number,
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Thông tin chi tiết nguyên liệu' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nguyên liệu' })
  @ApiResponse({ status: 400, description: 'ID không hợp lệ' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.materialsService.findOne(id, query.lang);
  }
}
