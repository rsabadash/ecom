import { ReactNode } from 'react';
import { horizontalAlignment } from './constants';

export type TableColumn<K> = {
  title: string;
  key: string;
  width: string;
  align?: ValuesOfObject<typeof horizontalAlignment>;
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
  tableClassName?: string;
  tableLabeledBy?: string;
  items: Record<string, any>[];
  columns: TableColumn<Record<string, any>>[];
  rowCustomRender?: (args: RowCustomRenderArgs) => ReactNode;
  tableRowRenderKey?: string;
};
