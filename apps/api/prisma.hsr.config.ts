// Prisma 7 configuration for Honkai: Star Rail database
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/hsr/models',
  migrations: {
    path: 'prisma/hsr/migrations',
  },
  datasource: {
    url: env('HSR_DATABASE_URL'),
  },
});
