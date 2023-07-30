import { FC, useEffect, useState } from 'react';

import { ReactComponent as ChevronLeftIcon } from '../../assets/icons/ChevronLeft.svg';
import { ReactComponent as ChevronRightIcon } from '../../assets/icons/ChevronRight.svg';
import { usePreviousPersistent } from '../../common/hooks';
import { useTranslation } from '../IntlProvider';
import { DOTS, INITIAL_PAGE } from './constants';
import { usePaginationRange } from './hooks';
import { PaginationItem } from './PaginationItem';
import { PaginationProps } from './types';

import classes from './styles/pagination.module.css';

export const Pagination: FC<PaginationProps> = ({
  limit,
  total,
  initialPage,
  queryParameters,
  paginationClassName,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(
    initialPage || INITIAL_PAGE,
  );

  const previousLimit = usePreviousPersistent(limit);

  useEffect(() => {
    if (limit !== previousLimit) {
      setCurrentPage(INITIAL_PAGE);
    }
  }, [limit, previousLimit]);

  const { translate } = useTranslation();

  const paginationRange = usePaginationRange({
    currentPage,
    totalCount: total,
    siblingCount: 1,
    pageSize: limit,
  });

  const paginationRangeSize = paginationRange.length;

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRangeSize < 2) {
    return null;
  }

  const onNext = (): void => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const onPrevious = (): void => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const ariaLabelTranslation = translate('page');

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === paginationRange[paginationRangeSize - 1];

  return (
    <nav aria-label={translate('pagination')} className={paginationClassName}>
      <ul className={classes.pagination__list}>
        <PaginationItem
          disabled={isFirstPage}
          pageNumber={isFirstPage ? undefined : currentPage - 1}
          ariaLabel={translate('page.previous')}
          onItemClick={onPrevious}
          queryParameters={queryParameters}
        >
          <ChevronLeftIcon />
        </PaginationItem>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem
                disabled
                key={`${pageNumber}${index}`}
                pageNumber={undefined}
                queryParameters={queryParameters}
              >
                &#8230;
              </PaginationItem>
            );
          }

          return (
            <PaginationItem
              key={pageNumber}
              pageNumber={pageNumber}
              isSelected={pageNumber === currentPage}
              ariaLabel={`${ariaLabelTranslation} ${pageNumber}`}
              ariaCurrent={currentPage === pageNumber ? 'page' : undefined}
              onItemClick={() => setCurrentPage(pageNumber)}
              queryParameters={queryParameters}
            >
              {pageNumber}
            </PaginationItem>
          );
        })}
        <PaginationItem
          disabled={isLastPage}
          pageNumber={isLastPage ? undefined : currentPage + 1}
          ariaLabel={translate('page.next')}
          onItemClick={onNext}
          queryParameters={queryParameters}
        >
          <ChevronRightIcon />
        </PaginationItem>
      </ul>
    </nav>
  );
};
