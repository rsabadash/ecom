import { ReactNode } from 'react';

export type TableColumn<K> = {
  title: string;
  key: string;
  width: string;
  isHidden?: boolean;
  valueGetter?: (value: any, item: Record<keyof K, any>) => ReactNode;
};

export type TableColumnGeneric<K> = Omit<TableColumn<K>, 'key'> & {
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
  columns: TableColumn<Record<string, any>>[];
  rowCustomRender?: (args: RowCustomRenderArgs) => ReactNode;
  isRowInteractive?: boolean;
  isRowLinkInteractive?: boolean;
  tableRowRenderKey?: string;
};
