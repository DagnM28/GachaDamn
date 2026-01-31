import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GenshinWikiModule } from './genshin-wiki/genshin-wiki.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    GenshinWikiModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
