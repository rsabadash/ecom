import { PropsWithChildren } from 'react';

import { LIMIT_ITEMS_DEFAULT } from './constants';

export type PaginationProps = {
  limit: number;
  total: number;
  initialPage?: number;
  queryParameters: string;
  paginationClassName?: string;
};

export type PaginationItemProps = PropsWithChildren<{
  disabled?: boolean;
  pageNumber: undefined | number;
  isSelected?: boolean;
  ariaLabel?: string;
  ariaCurrent?: undefined | 'page';
  onItemClick?: () => void;
  queryParameters: string;
}>;

export type PaginationLimitProps = {
  items: readonly Limit[];
  value: number;
  onLimitChange: (value: Limit) => void;
};

export type Limit = (typeof LIMIT_ITEMS_DEFAULT)[number];
