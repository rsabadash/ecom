import { DEFAULT_ELEMENT_SIZE } from '../../common/constants/sizes';
import { TableRowRoles } from './types';

export const INITIAL_FOCUS_INDEX = 0;

export const INDEX_ABSENCE_FOCUS = -1;

export const DEFAULT_TABLE_SIZE = DEFAULT_ELEMENT_SIZE;

export const HORIZONTAL_ALIGNMENT = {
  STARS: 'flex-start',
  END: 'flex-end',
  CENTER: 'center',
} as const;

export const TABLE_ROLES = {
  TREEGRID: 'treegrid',
  GRID: 'grid',
} as const;

export const TABLE_ROW_ROLES: TableRowRoles = {
  treegrid: 'treeitem',
  grid: 'row',
} as const;
