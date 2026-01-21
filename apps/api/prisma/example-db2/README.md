# Example Database 2 Schema

Template cho database thứ 2 trong tương lai.

## Cách sử dụng

1. Đổi tên folder `example-db2` thành tên database của bạn
2. Đổi tên file `example-db2.schema.prisma` thành `<tên-db>.schema.prisma`
3. Cập nhật `output` path trong schema file
4. Cập nhật environment variable name
5. Thêm vào `prisma.config.ts`

## Environment Variable

```env
EXAMPLE_DB2_DATABASE_URL="postgresql://user:password@localhost:5432/db2?schema=public"
```
