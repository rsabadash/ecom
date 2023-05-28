import { ReactNode } from 'react';
import { horizontalAlignment, tableRoles, tableRowRoles } from './constants';

type TableCellValueGetterProps<K> = {
  index: number;
  value: any;
  item: Record<keyof K, any>;
};

export type TableColumn<K> = {
  title: string;
  key: string;
  width: string;
  align?: ValuesOfObject<typeof horizontalAlignment>;
  isHidden?: boolean;
  valueGetter?: (props: TableCellValueGetterProps<K>) => ReactNode;
};

export type TableColumnGeneric<K> = Omit<TableColumn<K>, 'key'> & {
  key: keyof K;
};

export type TableBodyRowProps = {
  tabIndex: -1 | 0;
  className: string;
  role: ValuesOfObject<typeof tableRowRoles>;
  ['aria-rowindex']: number;
};

export type RowCustomRenderProps<I = any> = {
  row: ReactNode;
  item: I;
  rowProps: TableBodyRowProps;
};

export type TableProps = {
  tableLabeledBy?: string;
  tableBodyClassName?: string;
  tableRowClassName?: string;
  items: Record<string, any>[];
  tableRole?: ValuesOfObject<typeof tableRoles>;
  columns: TableColumn<Record<string, any>>[];
  rowCustomRender?: (args: RowCustomRenderProps) => ReactNode;
  bottomPanelNode?: ReactNode;
  tableRowRenderKey?: string;
};
