import { FC, MouseEvent, PropsWithChildren } from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import clsx from 'clsx';

import { PAGE } from '../../common/constants/filters';
import { PaginationItemProps } from './types';

import classes from './styles/pagination.module.css';

export const PaginationItem: FC<PropsWithChildren<PaginationItemProps>> = ({
  disabled,
  children,
  pageNumber,
  isSelected,
  ariaLabel,
  ariaCurrent,
  onItemClick,
  queryParameters,
}) => {
  let params: '' | URLSearchParams = '';

  if (!disabled && pageNumber !== undefined && pageNumber !== 1) {
    params = createSearchParams(queryParameters);
    params.set(PAGE, String(pageNumber));
  }

  const handleItemClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (disabled || isSelected) {
      event.preventDefault();
    }

    onItemClick && onItemClick();
  };

  const listItemClassnames = clsx(classes.pagination__listItem, {
    [classes.pagination__listItem_disabled]: disabled,
  });

  const listItemLinkClassnames = !disabled
    ? clsx(classes.pagination__listItemLink, {
        [classes.pagination__listItemLink_selected]: isSelected,
      })
    : undefined;

  return (
    <li className={listItemClassnames}>
      {disabled ? (
        children
      ) : (
        <Link
          to={`?${params?.toString()}`}
          onClick={handleItemClick}
          aria-label={ariaLabel}
          aria-current={ariaCurrent}
          className={listItemLinkClassnames}
        >
          {children}
        </Link>
      )}
    </li>
  );
};
