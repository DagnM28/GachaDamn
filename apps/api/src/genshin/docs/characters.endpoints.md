# Characters Endpoints

API endpoints để quản lý thông tin nhân vật Genshin Impact.

Base URL: `/genshin/characters`

---

## 1. Get All Characters

Lấy danh sách characters với pagination, filtering và search.

```
GET /genshin/characters
```

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `lang` | `en` \| `vn` | No | `en` | Ngôn ngữ |
| `elementType` | string | No | - | Filter theo element (e.g., `ELEMENT_PYRO`) |
| `weaponType` | string | No | - | Filter theo weapon (e.g., `WEAPON_POLE`) |
| `rarity` | number | No | - | Filter theo độ hiếm (4 hoặc 5) |
| `region` | string | No | - | Filter theo region (e.g., `Liyue`) |
| `search` | string | No | - | Tìm kiếm theo tên hoặc title |
| `page` | number | No | `1` | Số trang |
| `limit` | number | No | `20` | Số items mỗi trang |

### Examples

```bash
# Lấy tất cả characters (English)
GET /genshin/characters

# Lấy characters tiếng Việt
GET /genshin/characters?lang=vn

# Lấy 5-star Pyro characters
GET /genshin/characters?rarity=5&elementType=ELEMENT_PYRO

# Tìm kiếm
GET /genshin/characters?search=Hu%20Tao

# Pagination
GET /genshin/characters?page=2&limit=10
```

### Response

```json
{
  "data": [
    {
      "id": 10000046,
      "name": "Hu Tao",
      "title": "Fragrance in Thaw",
      "description": "...",
      "weaponType": "WEAPON_POLE",
      "weaponText": "Polearm",
      "elementType": "ELEMENT_PYRO",
      "elementText": "Pyro",
      "rarity": 5,
      "region": "Liyue",
      "...": "..."
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

---

## 2. Get Character by ID

Lấy thông tin chi tiết character theo ID, bao gồm ascension costs.

```
GET /genshin/characters/:id
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | Character ID |

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `lang` | `en` \| `vn` | No | `en` | Ngôn ngữ |

### Examples

```bash
# Lấy Hu Tao (English)
GET /genshin/characters/10000046

# Lấy Hu Tao (Vietnamese)
GET /genshin/characters/10000046?lang=vn
```

### Response

```json
{
  "id": 10000046,
  "name": "Hu Tao",
  "title": "Fragrance in Thaw",
  "description": "...",
  "weaponType": "WEAPON_POLE",
  "weaponText": "Polearm",
  "elementType": "ELEMENT_PYRO",
  "elementText": "Pyro",
  "rarity": 5,
  "region": "Liyue",
  "ascensionCosts": [
    {
      "id": "...",
      "phase": "ascend1",
      "itemId": 202,
      "itemName": "Mora",
      "count": 20000
    },
    {
      "phase": "ascend1",
      "itemId": 104111,
      "itemName": "Agnidus Agate Sliver",
      "count": 1
    }
  ]
}
```

---

## 3. Get Character by Name

Lấy thông tin chi tiết character theo tên.

```
GET /genshin/characters/by-name/:name
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Character name (URL encoded) |

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `lang` | `en` \| `vn` | No | `en` | Ngôn ngữ |

### Examples

```bash
# Lấy by English name
GET /genshin/characters/by-name/Hu%20Tao

# Lấy by Vietnamese name
GET /genshin/characters/by-name/Hồ%20Đào?lang=vn
```

### Response

Same as Get by ID

---

## 4. Get Statistics

Lấy thống kê characters theo rarity, element, weapon, region.

```
GET /genshin/characters/stats
```

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `lang` | `en` \| `vn` | No | `en` | Ngôn ngữ |

### Examples

```bash
GET /genshin/characters/stats
GET /genshin/characters/stats?lang=vn
```

### Response

```json
{
  "total": 100,
  "byRarity": [
    { "rarity": 4, "count": 30 },
    { "rarity": 5, "count": 70 }
  ],
  "byElement": [
    { "element": "ELEMENT_PYRO", "count": 15 },
    { "element": "ELEMENT_HYDRO", "count": 12 },
    { "element": "ELEMENT_ANEMO", "count": 10 }
  ],
  "byWeapon": [
    { "weapon": "WEAPON_SWORD", "count": 20 },
    { "weapon": "WEAPON_CLAYMORE", "count": 15 }
  ],
  "byRegion": [
    { "region": "Mondstadt", "count": 25 },
    { "region": "Liyue", "count": 30 }
  ]
}
```

---

## Error Responses

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Character with ID 99999 not found",
  "error": "Not Found"
}
```

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": ["lang must be one of the following values: en, vn"],
  "error": "Bad Request"
}
```

---

## Constants Reference

### Element Types
- `ELEMENT_PYRO` - Pyro/Hỏa
- `ELEMENT_HYDRO` - Hydro/Thủy
- `ELEMENT_ANEMO` - Anemo/Phong
- `ELEMENT_ELECTRO` - Electro/Lôi
- `ELEMENT_DENDRO` - Dendro/Thảo
- `ELEMENT_CRYO` - Cryo/Băng
- `ELEMENT_GEO` - Geo/Nham

### Weapon Types
- `WEAPON_SWORD` - Sword/Kiếm
- `WEAPON_CLAYMORE` - Claymore/Trọng Kiếm
- `WEAPON_POLE` - Polearm/Vũ Khí Cán Dài
- `WEAPON_BOW` - Bow/Cung
- `WEAPON_CATALYST` - Catalyst/Pháp Khí

### Rarities
- `4` - 4 sao
- `5` - 5 sao
