import { PropsWithChildren } from 'react';

export type GridRowBalancerProps = PropsWithChildren<{
  columns: number;
  elementRows: number;
}>;

export type GridRowBalancerContextValue = Omit<
  GridRowBalancerProps,
  'children'
>;
