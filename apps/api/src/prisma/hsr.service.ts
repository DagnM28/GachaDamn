import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/hsr';
import { PrismaNeon } from '@prisma/adapter-neon';

@Injectable()
export class HsrPrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.HSR_DATABASE_URL;
    if (!connectionString) {
      throw new Error('HSR_DATABASE_URL is not set');
    }

    const adapter = new PrismaNeon({ connectionString });

    super({
      adapter,
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'error', 'warn']
          : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
