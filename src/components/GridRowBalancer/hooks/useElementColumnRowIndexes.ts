import { useMemo } from 'react';

import { useGridRowBalancer } from '../GridRowBalancer';

type UseElementColumnRowIndexesReturn = {
  rowIndex: number;
  currentColumnIndex: number;
  elementRowIndexes: number[];
};

export const useElementColumnRowIndexes = (
  columnIndex: undefined | number = 0,
): UseElementColumnRowIndexesReturn => {
  const { columns, elementRows } = useGridRowBalancer();

  // To the elements we pass consecutive numbers 1, 2, 3, 4, 5, 6 etc.
  // But for each row we should define the same columns
  // For instance: 3 columns means that each row has 1, 2, 3 indexes
  // First row: 1 -> 1, 2 -> 2, 3 -> 3; second row: 4 -> 1, 5 -> 2, 6 -> 3
  // 1%3=1, 2%3=2, 3%3=0 (set maximum column number)
  const currentColumnIndex =
    columnIndex === 0 ? 0 : columnIndex % columns || columns;

  // Define row of an element
  const rowIndex = columnIndex === 0 ? 0 : Math.ceil(columnIndex / columns);

  // Define the last row index of an element`s row
  const lastElementRowIndex = rowIndex * elementRows;

  const elementRowIndexes = useMemo(() => {
    if (columnIndex === 0) {
      return [...Array(elementRows)];
    }

    // list to iterate and define the row index for each row in the element
    // For instance: 1, 2, 3 - first row, 4, 5, 6 - second row etc.
    // The list itself - 0, 1, 2
    const elementRowsList = [...Array(elementRows).keys()];

    // Define all indexes for an element`s row
    // Start from end because we define the biggest an element`s row index
    // For instance: 3-2=1, 3-1=2, 3-0=3
    // The result: [1, 2, 3], if use "reduce" the result will be [3, 2, 1]
    return elementRowsList.reduceRight<number[]>((acc, rowIndex): number[] => {
      acc.push(lastElementRowIndex - rowIndex);

      return acc;
    }, []);
  }, [columnIndex, elementRows, lastElementRowIndex]);

  return {
    rowIndex,
    currentColumnIndex,
    elementRowIndexes,
  };
};
