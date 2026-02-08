import * as fs from 'fs';
import * as path from 'path';

export function readJsonFiles<T>(dirPath: string): T[] {
  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️  Directory not found: ${dirPath}`);
    return [];
  }

  const files = fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith('.json'));
  return files.map((file) => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  });
}

export function getDataPath(
  lang: 'English' | 'Vietnamese',
  entity: string,
): string {
  return path.join(process.cwd(), 'data', lang, entity);
}

export function getLangCode(lang: 'English' | 'Vietnamese'): 'en' | 'vn' {
  return lang === 'English' ? 'en' : 'vn';
}
