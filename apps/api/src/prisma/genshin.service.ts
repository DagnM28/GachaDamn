import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { GenshinClient } from './index';

@Injectable()
export class GenshinPrismaService
  extends GenshinClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
