# Prisma Multi-Database Setup

Hướng dẫn làm việc với Prisma trong monorepo với nhiều databases.

## Cấu trúc

```
prisma/
├── genshin/                    # Database 1
│   ├── schema.prisma          # Generator + Datasource (REQUIRED)
│   ├── character.prisma       # Models
│   └── migrations/            # Auto-generated
│
└── <db-name>/                 # Database khác (tương tự)
    ├── schema.prisma
    ├── *.prisma
    └── migrations/
```

## Làm việc với Database hiện có (Genshin)

### Generate Prisma Client
```bash
npm run prisma:genshin:generate
```

### Tạo migration sau khi thay đổi schema
```bash
npm run prisma:genshin:migrate
```

### Push schema (dev only, bỏ qua migrations)
```bash
npm run prisma:genshin:push
```

### Mở Prisma Studio
```bash
npm run prisma:genshin:studio
```

### Format schema files
```bash
npm run prisma:genshin:format
```

## Thêm Database mới

### Bước 1: Tạo cấu trúc folder

```bash
mkdir prisma/<db-name>
```

### Bước 2: Tạo file `schema.prisma` (REQUIRED)

File `prisma/<db-name>/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../../../../node_modules/@prisma/<db-name>-client"
}

datasource db {
  provider = "postgresql"
  url      = env("<DB_NAME>_DATABASE_URL")
}
```

**Lưu ý:**
- File PHẢI tên là `schema.prisma`
- Output path trỏ về root `node_modules/@prisma/<db-name>-client`
- Env variable phải unique: `<DB_NAME>_DATABASE_URL`

### Bước 3: Tạo file models

File `prisma/<db-name>/user.prisma`:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
  
  @@map("users")
}
```

### Bước 4: Thêm scripts vào `package.json`

```json
{
  "scripts": {
    "prisma:<db-name>:generate": "prisma generate --schema=./prisma/<db-name>",
    "prisma:<db-name>:migrate": "prisma migrate dev --schema=./prisma/<db-name>",
    "prisma:<db-name>:push": "prisma db push --schema=./prisma/<db-name>",
    "prisma:<db-name>:studio": "prisma studio --schema=./prisma/<db-name>",
    "prisma:<db-name>:format": "prisma format --schema=./prisma/<db-name>"
  }
}
```

### Bước 5: Thêm env variable

File `.env`:

```env
<DB_NAME>_DATABASE_URL="postgresql://user:password@localhost:5432/<db-name>?schema=public"
```

### Bước 6: Generate và migrate

```bash
npm run prisma:<db-name>:generate
npm run prisma:<db-name>:migrate
```

## Thêm Model mới vào Database hiện có

### Bước 1: Tạo file model mới

File `prisma/genshin/weapon.prisma`:

```prisma
model Weapon {
  id     Int    @id @default(autoincrement())
  name   String @unique
  type   String
  rarity Int
  
  @@map("weapons")
}
```

### Bước 2: Generate và migrate

```bash
npm run prisma:genshin:generate
npm run prisma:genshin:migrate
```

## Sử dụng trong Code

### Import Prisma Client

```typescript
import { PrismaClient as GenshinClient } from '@prisma/genshin-client';

const genshin = new GenshinClient();
```

### Hoặc dùng wrapper (NestJS)

```typescript
import { GenshinPrismaService } from './prisma/genshin.service';

@Injectable()
export class CharacterService {
  constructor(private genshin: GenshinPrismaService) {}

  async getAll() {
    return this.genshin.character.findMany();
  }
}
```

## Lưu ý quan trọng

1. **Monorepo**: Prisma Client được generate vào root `node_modules/@prisma/<db-name>-client`
2. **File schema.prisma**: PHẢI tên là `schema.prisma` và chứa `generator` + `datasource`
3. **Multi-file schema**: Các file `.prisma` khác chỉ chứa models, enums, types
4. **Migrations folder**: Tự động tạo khi chạy migrate, cùng cấp với `schema.prisma`
5. **Relations**: Chỉ giữa models trong cùng 1 database

## Troubleshooting

### Lỗi: "Can't reach database server"
- Kiểm tra PostgreSQL đang chạy
- Kiểm tra `DATABASE_URL` trong `.env`

### Lỗi: "Database does not exist"
```sql
CREATE DATABASE <db-name>;
```

### Sau khi thay đổi schema
```bash
npm run prisma:<db-name>:format
npm run prisma:<db-name>:generate
npm run prisma:<db-name>:migrate
```


## Multi-language Data với PostgreSQL Schemas

### Thiết kế cho dữ liệu đa ngôn ngữ (Cấu trúc giống nhau)

Khi cấu trúc tables giống nhau nhưng dữ liệu khác ngôn ngữ, sử dụng **PostgreSQL schemas** (en/vn):

#### Setup

**1. Khai báo schemas trong `schema.prisma`:**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("GENSHIN_DATABASE_URL")
  schemas  = ["en", "vn"]  // Khai báo các schemas
}
```

**2. Thêm `@@schema()` vào models:**

```prisma
model CharacterEN {
  id   Int    @id
  name String
  
  @@map("characters")  // Tên table
  @@schema("en")       // Thuộc schema EN
}

model CharacterVN {
  id   Int    @id
  name String
  
  @@map("characters")  // Cùng tên table
  @@schema("vn")       // Thuộc schema VN
}
```

**3. Tạo schemas trong PostgreSQL:**

```sql
CREATE SCHEMA IF NOT EXISTS en;
CREATE SCHEMA IF NOT EXISTS vn;
```

**4. Generate và migrate:**

```bash
npm run prisma:genshin:generate
npm run prisma:genshin:migrate
```

#### Sử dụng

```typescript
// Query schema EN
const enChars = await prisma.characterEN.findMany();

// Query schema VN
const vnChars = await prisma.characterVN.findMany();

// Query cả 2 schemas
const [en, vn] = await Promise.all([
  prisma.characterEN.findUnique({ where: { id: 10000046 } }),
  prisma.characterVN.findUnique({ where: { id: 10000046 } })
]);
```

#### Ưu điểm

- ✅ Cấu trúc giống nhau, dễ maintain
- ✅ Tách biệt rõ ràng theo ngôn ngữ
- ✅ Migration 1 lần cho cả 2 schemas
- ✅ Dễ thêm ngôn ngữ mới (tạo schema mới)
- ✅ Type-safe với Prisma Client

#### Thêm ngôn ngữ mới (ví dụ: Japanese)

**1. Thêm vào `schemas` array:**

```prisma
datasource db {
  schemas = ["en", "vn", "ja"]
}
```

**2. Tạo models với `@@schema("ja")`:**

```prisma
model CharacterJA {
  id   Int    @id
  name String
  
  @@map("characters")
  @@schema("ja")
}
```

**3. Tạo schema và migrate:**

```sql
CREATE SCHEMA IF NOT EXISTS ja;
```

```bash
npm run prisma:genshin:migrate
```
