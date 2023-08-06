import { Link } from 'react-router-dom';

import { endpoints } from '../../common/constants/api';
import { routes } from '../../common/constants/routes';
import { useCachedPaginationAPI } from '../../common/hooks';
import { usePaginationLimit } from '../../components/Pagination/hooks';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
  TablePagination,
} from '../../components/Table';
import { CategoriesListPlaceholder } from './CategoriesListPlaceholder';
import { TABLE_CATEGORIES_ID } from './constants';
import { useCategoriesTableColumns } from './hooks';
import { Category } from './types';

export const CategoriesList = () => {
  const { limitValue, setLimitValue } = usePaginationLimit();

  const { list, total } = useCachedPaginationAPI<Category>({
    url: endpoints.categories.root,
    limit: limitValue,
  });

  const columns: TableColumnGeneric<Category>[] = useCategoriesTableColumns();

  return (
    <>
      {list.length > 0 ? (
        <Table
          items={list}
          columns={columns}
          tableLabeledBy={TABLE_CATEGORIES_ID}
          rowCustomRender={({
            row,
            item,
            rowProps,
          }: RowCustomRenderProps<Category>) => (
            <Link
              key={item._id}
              to={`${routes.categories.root}/${item._id}`}
              {...rowProps}
            >
              {row}
            </Link>
          )}
          bottomPanelNode={
            <TablePagination
              total={total}
              limitValue={limitValue}
              setLimitValue={setLimitValue}
            />
          }
        />
      ) : (
        // TODO if total > 0 we have to show 404 not the component bellow
        <CategoriesListPlaceholder />
      )}
    </>
  );
};
