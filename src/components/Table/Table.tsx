import { FC } from 'react';
import Foreground from '../Foreground';
import { TableProps } from './types';
import classes from './styles/index.module.css';

const Table: FC<TableProps> = (
    {
        items,
        columns,
        rowCustomRender
    }
) => {
    return (
        <Foreground foregroundClassName={classes.table__foreground}>
            <div className={classes.table__header}>
                {
                    columns.map((column) => {
                        return (
                            <div
                                key={column.key}
                                style={{ width: column.width }}
                                className={classes.table__headerItem}
                            >
                                {column.title}
                            </div>
                        );
                    })
                }
            </div>
            <div className={classes.table__body}>
                {
                    items.map((item) => {
                        const row = (
                            <div className={classes.table__row}>
                                {
                                    columns.map(({ key, width, valueGetter }) => {
                                        const rowValue = valueGetter ? valueGetter(item[key]) : item[key];

                                        return (
                                            <div
                                                key={rowValue}
                                                style={{ width }}
                                                className={classes.table__rowItem}
                                            >
                                                {rowValue}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        );

                        return rowCustomRender ? rowCustomRender(row, item) : row;
                    })
                }
            </div>
        </Foreground>
    );
};

export default Table;