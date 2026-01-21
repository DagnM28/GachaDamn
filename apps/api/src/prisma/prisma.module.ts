import { Module, Global } from '@nestjs/common';
import { GenshinPrismaService } from './genshin.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [GenshinPrismaService, PrismaService],
  exports: [GenshinPrismaService],
})
export class PrismaModule {}
