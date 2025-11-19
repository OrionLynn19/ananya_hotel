import fs from 'fs';
import path from 'path';
import { Room } from './types';

const ROOMS_DIR = path.join(process.cwd(), 'src', 'app', 'data');

export function listRoomSlugs(): string[] {
  if (!fs.existsSync(ROOMS_DIR)) return [];
  return fs.readdirSync(ROOMS_DIR).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''));
}

export function readRoomBySlug(slug: string): Room | null {
  const fullPath = path.join(ROOMS_DIR, `${slug}.json`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, 'utf8');
  try {
    const parsed = JSON.parse(raw) as Room;
    return parsed;
  } catch (err) {
    console.error(`Failed to parse room JSON for slug="${slug}"`, err);
    return null;
  }
}
