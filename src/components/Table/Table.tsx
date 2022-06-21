import { FC } from 'react';
import { Foreground } from '../Section';

type Column = {
    title: string;
    key: string;
};

type TableProps = {
    columns: Column[];
};

const Table: FC<TableProps> = (
    {
        columns
    }
) => {
    return (
        <Foreground>
            <div style={{ display: 'flex' }}>
                {
                    columns.map((column) => {
                        return (
                            <div key={column.key}>{column.title}</div>
                        );
                    })
                }
            </div>
        </Foreground>
    );
};

export default Table;