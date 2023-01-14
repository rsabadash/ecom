import { ReactNode } from 'react';

export type TableColumn = {
  title: string;
  key: string;
  width: string;
  valueGetter?: (value: any) => ReactNode;
};

export type TableColumnGeneric<K> = Omit<TableColumn, 'key'> & {
  key: keyof K;
};

export type TableBodyRowProps = {
  tabIndex: -1 | 0;
  className: string;
  role: 'row';
  ['aria-rowindex']: number;
};

export type RowCustomRenderArgs<I = any> = {
  row: ReactNode;
  item: I;
  rowProps: TableBodyRowProps;
};

export type TableProps = {
  tableLabeledBy?: string;
  items: Record<string, any>[];
  columns: TableColumn[];
  rowCustomRender?: (args: RowCustomRenderArgs) => ReactNode;
  isRowInteractive?: boolean;
  isRowLinkInteractive?: boolean;
};
