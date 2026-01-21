# Migration Steps - Multi-Schema (Neon Database)

## Bước 1: Tạo schemas trong Neon

Truy cập [Neon Console](https://console.neon.tech/) > SQL Editor và chạy:

```sql
CREATE SCHEMA IF NOT EXISTS en;
CREATE SCHEMA IF NOT EXISTS vn;
```

## Bước 2: Generate Prisma Client

```bash
npm run prisma:genshin:generate
```

## Bước 3: Chạy migration

```bash
npm run prisma:genshin:migrate
```

Nhập tên migration: `multi_schema_en_vn`

## Xác nhận

Trong Neon SQL Editor:

```sql
-- Xem tables đã tạo
SELECT table_schema, table_name 
FROM information_schema.tables 
WHERE table_schema IN ('en', 'vn');
```

Hoặc mở Prisma Studio:

```bash
npm run prisma:genshin:studio
```

## Troubleshooting

### "Schema does not exist"
→ Quay lại Bước 1, tạo schemas trong Neon

### "SSL connection required"
→ Đảm bảo `.env` có `?sslmode=require`:
```env
GENSHIN_DATABASE_URL="postgresql://...@ep-xxx.neon.tech/genshin?sslmode=require"
```

### "Migration failed"
→ Reset và chạy lại:
```bash
npm run prisma:genshin:migrate:reset
npm run prisma:genshin:migrate
```
