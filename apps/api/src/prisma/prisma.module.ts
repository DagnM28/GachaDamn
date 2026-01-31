import { Global, Module } from '@nestjs/common';
import { GenshinPrismaService } from './genshin.service';
import { HsrPrismaService } from './hsr.service';

@Global()
@Module({
  providers: [GenshinPrismaService, HsrPrismaService],
  exports: [GenshinPrismaService, HsrPrismaService],
})
export class PrismaModule {}
