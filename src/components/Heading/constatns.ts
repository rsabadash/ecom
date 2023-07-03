import { LevelTagMap } from './types';

export const LEVEL_TAG_MAP: LevelTagMap = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;

export const DEFAULT_LEVEL = 1;

export const DEFAULT_FONT_SIZE = 1;
