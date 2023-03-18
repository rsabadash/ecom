import {
  FC,
  KeyboardEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { Foreground } from '../../layouts/Foreground';
import { TableBodyRowProps, TableProps } from './types';
import {
  INDEX_ABSENCE_FOCUS,
  INITIAL_FOCUS_INDEX,
  tableRoles,
  tableRowRoles,
} from './constants';
import { EventKeys } from '../../common/enums/events';
import { KeyIndexMap } from '../Navigation/types';
import classes from './styles/index.module.css';

// TODO ARIA for sorting https://www.w3.org/WAI/ARIA/apg/practices/grid-and-table-properties/
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/table_role

export const Table: FC<TableProps> = ({
  items,
  columns,
  tableRole = tableRoles.grid,
  tableLabeledBy,
  tableBodyClassName,
  rowCustomRender,
  tableRowRenderKey = '_id',
}) => {
  const tableBodyRef = useRef<HTMLDivElement>(null);
  const [focusIndex, setFocusIndex] = useState<number>(INITIAL_FOCUS_INDEX);
  const [isKeyboardControl, setIsKeyboardControl] = useState(false);

  const getRowElementByIndex = useCallback(
    (index: number): HTMLElement | undefined => {
      if (index !== INDEX_ABSENCE_FOCUS && tableBodyRef.current) {
        return tableBodyRef.current.children[index] as HTMLElement;
      }
    },
    [],
  );

  const blurNavItem = (index: number) => {
    const rowElement = getRowElementByIndex(index);

    if (rowElement) {
      rowElement.blur();
    }
  };

  useLayoutEffect(() => {
    if (isKeyboardControl) {
      const rowElement = getRowElementByIndex(focusIndex);

      if (rowElement) {
        rowElement.focus();
        rowElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusIndex, getRowElementByIndex, isKeyboardControl]);

  const defineFocusIndexByKey = (key: EventKeys): number | undefined => {
    const itemsLength = items.length;
    const isInitialIndex = focusIndex === INDEX_ABSENCE_FOCUS;

    const keyIndexPair: KeyIndexMap = {
      [EventKeys.Home]: 0,
      [EventKeys.End]: itemsLength - 1,
      [EventKeys.ArrowDown]:
        isInitialIndex || focusIndex === itemsLength - 1 ? 0 : focusIndex + 1,
      [EventKeys.ArrowUp]:
        isInitialIndex || focusIndex === 0 ? itemsLength - 1 : focusIndex - 1,
      [EventKeys.PageDown]:
        isInitialIndex || focusIndex === itemsLength - 1 ? 0 : focusIndex + 1,
      [EventKeys.PageUp]:
        isInitialIndex || focusIndex === 0 ? itemsLength - 1 : focusIndex - 1,
      [EventKeys.Tab]: INDEX_ABSENCE_FOCUS,
    };

    if (typeof keyIndexPair[key] !== 'undefined') {
      return keyIndexPair[key];
    }

    return undefined;
  };

  const handleTableBodyKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    const key = e.key as EventKeys;
    const index = defineFocusIndexByKey(key);

    if (typeof index === 'undefined') {
      return;
    }

    if (index !== INDEX_ABSENCE_FOCUS) {
      setIsKeyboardControl(true);
      setFocusIndex(index);

      return;
    }
  };

  const handleTableBodyMouseMove = (): void => {
    if (isKeyboardControl) {
      blurNavItem(focusIndex);
      setIsKeyboardControl(false);
    }
  };

  const tableBodyClassNames = clsx(classes.table__body, tableBodyClassName);

  return (
    <Foreground foregroundClassName={classes.tableForeground}>
      {/* aria-rowcount is total number of items, not only visible */}
      <div
        role={tableRole}
        className={classes.table}
        aria-rowcount={items.length}
        aria-labelledby={tableLabeledBy}
      >
        <div className={classes.table__header} role="rowgroup">
          <div
            className={classes.table__headerRow}
            role="row"
            aria-rowindex={1}
          >
            {columns.map((column) => {
              if (column.isHidden) return;

              return (
                <div
                  key={column.key}
                  style={{ minWidth: column.width }}
                  className={classes.table__headerItem}
                  role="columnheader"
                >
                  {column.title}
                </div>
              );
            })}
          </div>
        </div>
        <div
          role="rowgroup"
          className={tableBodyClassNames}
          onKeyDown={handleTableBodyKeyDown}
          onMouseMove={handleTableBodyMouseMove}
          ref={tableBodyRef}
        >
          {items.map((item, index) => {
            const tabIndex =
              focusIndex === index || focusIndex === INDEX_ABSENCE_FOCUS
                ? 0
                : -1;

            const rowProps: TableBodyRowProps = {
              tabIndex,
              className: classes.table__row,
              role: tableRowRoles[tableRole],
              // aria-rowindex to do exactly index from whole list length, not by current index
              'aria-rowindex': index + 2, // start not from zero and the header is the 1st, so 0 + 1 + 1
            };

            const row = columns.map(
              ({ key, width, align, valueGetter, title, isHidden }) => {
                if (isHidden) return;

                const rowValue = valueGetter
                  ? valueGetter(item[key], item)
                  : item[key];

                return (
                  <div
                    key={`${item[tableRowRenderKey]}${title}`}
                    style={{ minWidth: width, justifyContent: align }}
                    className={classes.table__cell}
                    role="gridcell"
                  >
                    {rowValue}
                  </div>
                );
              },
            );

            return rowCustomRender ? (
              rowCustomRender({ row, item, rowProps })
            ) : (
              <div {...rowProps}>{row}</div>
            );
          })}
        </div>
      </div>
    </Foreground>
  );
};
