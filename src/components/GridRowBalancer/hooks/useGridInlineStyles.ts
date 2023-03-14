import { useElementColumnRowIndexes } from './useElementColumnRowIndexes';
import { useMemo } from 'react';

type GridInlineStyle = {
  gridRow?: number;
  gridColumn?: number;
  marginTop?: string;
};

type UseGridInlineStylesReturn = GridInlineStyle[];

export const useGridInlineStyles = (
  columnIndex: undefined | number,
): UseGridInlineStylesReturn => {
  const { rowIndex, currentColumnIndex, elementRowIndexes } =
    useElementColumnRowIndexes(columnIndex);

  const marginTop = rowIndex === 0 || rowIndex > 1 ? '1.5rem' : undefined;

  return useMemo(
    () =>
      elementRowIndexes.map((elementRowIndex, index) => {
        return {
          gridRow: elementRowIndex,
          gridColumn: currentColumnIndex,
          // For space between grid elements except elements in the first row
          // Applied only for the first row of the element and columnIndex exists
          marginTop:
            columnIndex !== undefined && index === 0 ? marginTop : undefined,
        };
      }),
    [columnIndex, currentColumnIndex, elementRowIndexes, marginTop],
  );
};
