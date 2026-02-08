import { Controller, Get } from '@nestjs/common';
import { version } from '../../../package.json';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SWAGGER_TAGS } from '../../constants/swagger.constant';
import { MetadataScanner, ModulesContainer } from '@nestjs/core';
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants';

@ApiTags(SWAGGER_TAGS.GENSHIN_WIKI)
@Controller('gi-wiki')
export class GenshinWikiController {
  constructor(
    private readonly modulesContainer: ModulesContainer,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Trang chủ Genshin Wiki API',
    description: 'Trả về thông tin chào mừng và danh sách các endpoints có sẵn',
  })
  @ApiResponse({
    status: 200,
    description: 'Thông tin API và danh sách endpoints',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Welcome to Genshin Wiki API!' },
        version: { type: 'string', example: '1.0.0' },
        endpoints: {
          type: 'array',
          example: [],
        },
      },
    },
  })
  welcome() {
    return {
      message: 'Welcome to Genshin Wiki API!',
      version: version,
      endpoints: this.getModuleEndpoints(),
    };
  }

  private getModuleEndpoints(): Array<{ method: string; fullPath: string }> {
    const moduleRef = [...this.modulesContainer.values()].find(
      (m) => m.metatype?.name === 'GenshinWikiModule',
    );

    if (!moduleRef) return [];

    const routes: Array<{ method: string; fullPath: string }> = [];
    const controllers = moduleRef.controllers;

    controllers.forEach((wrapper) => {
      const { instance, metatype } = wrapper;
      if (!instance || !metatype) return;

      const controllerPath = Reflect.getMetadata(
        PATH_METADATA,
        metatype,
      ) as string;
      const prototype = Object.getPrototypeOf(instance) as object;
      const methodNames = this.metadataScanner.getAllMethodNames(prototype);

      methodNames.forEach((methodName) => {
        const methodRef = (instance as Record<string, unknown>)[methodName];
        if (typeof methodRef !== 'function') return;

        const routePath = Reflect.getMetadata(
          PATH_METADATA,
          methodRef as object,
        ) as string | undefined;
        const httpMethod = Reflect.getMetadata(
          METHOD_METADATA,
          methodRef as object,
        ) as number | undefined;

        if (routePath !== undefined) {
          const methodMap = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'ALL'];
          routes.push({
            method:
              (httpMethod !== undefined ? methodMap[httpMethod] : undefined) ??
              'UNKNOWN',
            fullPath: `api/${controllerPath}/${routePath}`.replace(/\/+/g, '/'),
          });
        }
      });
    });

    return routes;
  }
}
