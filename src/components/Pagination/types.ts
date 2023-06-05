export type PaginationProps = {
  limit: number;
  total: number;
  initialPage?: number;
  queryParameters: string;
  paginationClassName?: string;
};

export type PaginationItemProps = {
  disabled?: boolean;
  pageNumber: undefined | number;
  isSelected?: boolean;
  ariaLabel?: string;
  ariaCurrent?: undefined | 'page';
  onItemClick?: () => void;
  queryParameters: string;
};

export type PaginationLimitProps = {
  items: number[];
  value: number;
  onLimitChange: (value: number) => void;
};
