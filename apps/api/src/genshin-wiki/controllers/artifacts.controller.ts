import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ArtifactsService } from '../services';
import { ArtifactQueryDto, LanguageQueryDto } from '../dto/query.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SWAGGER_TAGS } from '../../constants/swagger.constant';

@ApiTags(SWAGGER_TAGS.GENSHIN_WIKI)
@Controller('gi-wiki/artifacts')
export class ArtifactsController {
  constructor(private readonly artifactsService: ArtifactsService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách tất cả bộ thánh di vật',
    description:
      'Trả về danh sách bộ thánh di vật với các bộ lọc và phân trang',
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
  @ApiResponse({ status: 200, description: 'Danh sách bộ thánh di vật' })
  @ApiResponse({ status: 400, description: 'Tham số không hợp lệ' })
  findAll(@Query() query: ArtifactQueryDto) {
    return this.artifactsService.findAll(query);
  }

  @Get('name/:name')
  @ApiOperation({
    summary: 'Tìm bộ thánh di vật theo tên',
    description: 'Trả về thông tin bộ thánh di vật dựa trên tên',
  })
  @ApiParam({
    name: 'name',
    description: 'Tên bộ thánh di vật',
    example: "Gladiator's Finale",
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['en', 'vn'],
    description: 'Ngôn ngữ (mặc định: en)',
  })
  @ApiResponse({ status: 200, description: 'Thông tin bộ thánh di vật' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bộ thánh di vật' })
  findByName(@Param('name') name: string, @Query() query: LanguageQueryDto) {
    return this.artifactsService.findByName(name, query.lang);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin bộ thánh di vật theo ID',
    description: 'Trả về thông tin chi tiết của bộ thánh di vật dựa trên ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bộ thánh di vật',
    example: 1,
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
    description: 'Thông tin chi tiết bộ thánh di vật',
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bộ thánh di vật' })
  @ApiResponse({ status: 400, description: 'ID không hợp lệ' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageQueryDto,
  ) {
    return this.artifactsService.findOne(id, query.lang);
  }
}
