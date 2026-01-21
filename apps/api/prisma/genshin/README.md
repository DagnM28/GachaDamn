# Genshin Database Schema

Database chứa thông tin về Genshin Impact từ genshin-db.

## Models

### Character
Thông tin nhân vật từ genshin-db/src/data/Vietnamese/characters

**Fields:**
- `id` (Int): ID từ game (ví dụ: 10000046 cho Hu Tao)
- `name` (String): Tên nhân vật (Hu Tao, Diluc, Nahida)
- `title` (String): Danh hiệu (Tuyết Tễ Mai Hương, Mặt Tối Của Bình Minh)
- `description` (Text): Mô tả nhân vật
- `weaponType` (String): Loại vũ khí (WEAPON_POLE, WEAPON_CLAYMORE, WEAPON_CATALYST, etc.)
- `weaponText` (String): Tên loại vũ khí tiếng Việt
- `bodyType` (String): Kiểu dáng (BODY_GIRL, BODY_MALE, BODY_LOLI, BODY_BOY)
- `gender` (String): Giới tính (nam, nữ)
- `qualityType` (String): Độ hiếm (QUALITY_ORANGE = 5 sao, QUALITY_PURPLE = 4 sao)
- `rarity` (Int): Số sao (4 hoặc 5)
- `birthdayMmdd` (String): Sinh nhật dạng MM/DD
- `birthday` (String): Sinh nhật tiếng Việt
- `elementType` (String): Nguyên tố (ELEMENT_PYRO, ELEMENT_HYDRO, ELEMENT_DENDRO, etc.)
- `elementText` (String): Tên nguyên tố tiếng Việt
- `affiliation` (String): Tổ chức
- `associationType` (String): Khu vực liên kết (ASSOC_LIYUE, ASSOC_MONDSTADT, etc.)
- `region` (String): Vùng (Liyue, Mondstadt, Sumeru, etc.)
- `substatType` (String): Loại substat
- `substatText` (String): Tên substat tiếng Việt
- `constellation` (String): Cung mệnh
- `cvEnglish`, `cvChinese`, `cvJapanese`, `cvKorean`: Thông tin lồng tiếng

**Relations:**
- `ascensionCosts`: Chi phí ascension

### CharacterAscensionCost
Chi phí vật phẩm để ascend nhân vật

**Fields:**
- `characterId` (Int): ID nhân vật
- `phase` (String): Giai đoạn (ascend1, ascend2, ..., ascend6)
- `itemId` (Int): ID vật phẩm
- `itemName` (String): Tên vật phẩm
- `count` (Int): Số lượng cần

## Environment Variable

```env
GENSHIN_DATABASE_URL="postgresql://user:password@localhost:5432/genshin?schema=public"
```

## Migration

Xem hướng dẫn trong file cha để biết cách migrate.
