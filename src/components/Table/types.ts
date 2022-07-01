import { ReactNode } from 'react';

export type TableColumn = {
    title: string;
    key: string;
    width: string;
    valueGetter?: (value: any) => ReactNode;
};

export type TableProps = {
    items: Record<string, any>[];
    columns: TableColumn[];
    rowCustomRender?: (row: ReactNode, item: any) => ReactNode;
};