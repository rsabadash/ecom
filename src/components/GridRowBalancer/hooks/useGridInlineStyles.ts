import { useElementColumnRowIndexes } from './useElementColumnRowIndexes';

type GridInlineStyle = {
  gridRow?: number;
  gridColumn?: number;
  marginTop?: string;
};

type UseGridInlineStyles = (
  columnIndex: undefined | number,
) => GridInlineStyle[];

export const useGridInlineStyles: UseGridInlineStyles = (columnIndex = 0) => {
  const { rowIndex, currentColumnIndex, elementRowIndexes } =
    useElementColumnRowIndexes(columnIndex);

  const marginTop = rowIndex === 0 || rowIndex > 1 ? '1.5rem' : undefined;

  return elementRowIndexes.map((elementRowIndex, index) => {
    return {
      gridRow: elementRowIndex,
      gridColumn: currentColumnIndex,
      // For space between grid elements except elements in the first row
      // Applied only for the first row of the element
      marginTop: index === 0 ? marginTop : undefined,
    };
  });
};
