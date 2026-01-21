# Genshin Module

Module quản lý dữ liệu Genshin Impact với multi-language support (EN/VN).

## Sub-modules

### Characters Module
Quản lý thông tin nhân vật Genshin Impact.

**Features:**
- Multi-language (EN/VN)
- Pagination & filtering
- Search by name/title
- Statistics by rarity, element, weapon, region

📖 [Characters API Documentation](./docs/characters.endpoints.md)

---

## Usage

### Import Module

```typescript
import { GenshinModule } from './genshin/genshin.module';

@Module({
  imports: [GenshinModule],
})
export class AppModule {}
```

### Inject Service

```typescript
import { CharactersService } from './genshin/services/characters.service';

@Injectable()
export class MyService {
  constructor(private charactersService: CharactersService) {}

  async getCharacters() {
    return this.charactersService.findAll({ lang: 'vn', rarity: 5 });
  }
}
```

---

## Development

```bash
# Start server
npm run dev

# Test endpoints
curl http://localhost:8000/genshin/characters
curl http://localhost:8000/genshin/characters/10000046?lang=vn
```
