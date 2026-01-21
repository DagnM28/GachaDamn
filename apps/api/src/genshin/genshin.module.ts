import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CharactersController } from './controllers/characters.controller';
import { CharactersService } from './services/characters.service';

@Module({
  imports: [PrismaModule],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class GenshinModule {}
