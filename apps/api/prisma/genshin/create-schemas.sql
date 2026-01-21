-- Tạo schemas cho multi-language support
-- Chạy script này trước khi migrate

CREATE SCHEMA IF NOT EXISTS en;
CREATE SCHEMA IF NOT EXISTS vn;

-- Kiểm tra schemas đã tạo
SELECT schema_name 
FROM information_schema.schemata 
WHERE schema_name IN ('en', 'vn');
