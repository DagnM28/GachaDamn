import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GenshinModule } from './genshin/genshin.module';

@Module({
  imports: [PrismaModule, GenshinModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
