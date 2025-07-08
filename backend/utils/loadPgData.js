import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadPGsByArea = (area) => {
  try {
    const filePath = path.join(__dirname, '../data', `pg_${area}.json`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error loading PG data for ${area}:`, error.message);
    return [];
  }
};

export const loadAllPGs = () => {
  const areas = ['hsr_layout', 'kormangala', 'whitefield'];
  return areas.flatMap(area => loadPGsByArea(area));
};
