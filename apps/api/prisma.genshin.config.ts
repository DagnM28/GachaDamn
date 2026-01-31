// Prisma 7 configuration for Genshin Impact database
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/genshin/models',
  migrations: {
    path: 'prisma/genshin/migrations',
  },
  datasource: {
    url: env('GENSHIN_DATABASE_URL'),
  },
});
