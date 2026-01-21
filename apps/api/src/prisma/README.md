# Prisma Services

Module này cung cấp Prisma services cho NestJS.

## Sử dụng

### 1. Import PrismaModule vào AppModule

```typescript
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  // ...
})
export class AppModule {}
```

### 2. Inject service vào controller/service

```typescript
import { Injectable } from '@nestjs/common';
import { GenshinPrismaService } from './prisma/genshin.service';

@Injectable()
export class CharacterService {
  constructor(private genshinDb: GenshinPrismaService) {}

  async getAllCharacters() {
    return this.genshinDb.character.findMany();
  }

  async getCharacterById(id: string) {
    return this.genshinDb.character.findUnique({
      where: { id },
      include: {
        talents: true,
        builds: {
          include: { weapon: true },
        },
      },
    });
  }

  async createCharacter(data: any) {
    return this.genshinDb.character.create({ data });
  }
}
```

## Thêm database service mới

Khi thêm database mới, tạo service tương tự:

```typescript
// src/prisma/my-new-db.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MyNewDbClient } from './index';

@Injectable()
export class MyNewDbPrismaService
  extends MyNewDbClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

Sau đó thêm vào PrismaModule:

```typescript
@Global()
@Module({
  providers: [GenshinPrismaService, MyNewDbPrismaService],
  exports: [GenshinPrismaService, MyNewDbPrismaService],
})
export class PrismaModule {}
```
