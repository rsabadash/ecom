import { GridRowBalancerContextValue } from './types';

export const MAX_ELEMENT_ROWS = 3;

export const CONTEXT_NAME = 'GridRowBalancerContext';

export const gridRowBalancerContextValueDefault: GridRowBalancerContextValue = {
  columns: 1,
  elementRows: MAX_ELEMENT_ROWS,
};
