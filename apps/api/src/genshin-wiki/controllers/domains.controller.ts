import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { DomainsService } from '../services';
import { DomainQueryDto, LanguageQueryDto } from '../dto/query.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SWAGGER_TAGS } from '../../constants/swagger.constant';

@ApiTags(SWAGGER_TAGS.GENSHIN_WIKI)
@Controller('gi-wiki/domains')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách tất cả bí cảnh',
    description: 'Trả về danh sách bí cảnh với các bộ lọc và phân trang',
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
    name: 'domainType',
    required: false,
    type: String,
    description: 'Lọc theo loại bí cảnh',
  })
  @ApiQuery({
    name: 'regionName',
    required: false,
    type: String,
    description: 'Lọc theo khu vực',
  })
  @ApiQuery({
    name: 'recommendedLevel',
    required: false,
    type: Number,
    description: 'Lọc theo cấp độ khuyến nghị',
  })
  @ApiResponse({ status: 200, description: 'Danh sách bí cảnh' })
  @ApiResponse({ status: 400, description: 'Tham số không hợp lệ' })
  findAll(@Query() query: DomainQueryDto) {
    return this.domainsService.findAll(query);
  }

  @Get('type/:domainType')
  @ApiOperation({
    summary: 'Lấy bí cảnh theo loại',
    description: 'Trả về danh sách bí cảnh thuộc loại cụ thể',
  })
  @ApiParam({
    name: 'domainType',
    description: 'Loại bí cảnh',
    example: 'Artifact',
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Danh sách bí cảnh theo loại' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bí cảnh' })
  findByType(
    @Param('domainType') domainType: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.domainsService.findByType(domainType, query.lang);
  }

  @Get('region/:regionName')
  @ApiOperation({
    summary: 'Lấy bí cảnh theo khu vực',
    description: 'Trả về danh sách bí cảnh thuộc khu vực cụ thể',
  })
  @ApiParam({
    name: 'regionName',
    description: 'Tên khu vực',
    example: 'Mondstadt',
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Danh sách bí cảnh theo khu vực' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bí cảnh' })
  findByRegion(
    @Param('regionName') regionName: string,
    @Query() query: LanguageQueryDto,
  ) {
    return this.domainsService.findByRegion(regionName, query.lang);
  }

  @Get('name/:name')
  @ApiOperation({
    summary: 'Tìm bí cảnh theo tên',
    description: 'Trả về thông tin bí cảnh dựa trên tên',
  })
  @ApiParam({
    name: 'name',
    description: 'Tên bí cảnh',
    example: 'Domain of Guyun',
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Thông tin bí cảnh' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bí cảnh' })
  findByName(@Param('name') name: string, @Query() query: LanguageQueryDto) {
    return this.domainsService.findByName(name, query.lang);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin bí cảnh theo ID',
    description: 'Trả về thông tin chi tiết của bí cảnh dựa trên ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bí cảnh',
    example: 1,
    type: Number,
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Thông tin chi tiết bí cảnh' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bí cảnh' })
  @ApiResponse({ status: 400, description: 'ID không hợp lệ' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.domainsService.findOne(id, query.lang);
  }
}
