import { Link } from 'react-router-dom';
import {
  RowCustomRenderArgs,
  Table,
  TableColumnGeneric,
} from '../../components/Table';
import { TABLE_CATEGORIES_ID } from './constants';
import { Category } from './types';
import { routes } from '../../common/constants/routes';
import { useCachedAPI } from '../../hooks';
import { endpoints } from '../../common/constants/api';
import { useCategoriesTableColumns } from './hooks';

export const CategoriesList = () => {
  const { data = [] } = useCachedAPI<Category[]>(
    `${endpoints.categories.root}`,
  );

  const columns: TableColumnGeneric<Category>[] = useCategoriesTableColumns();

  return (
    <Table
      isRowLinkInteractive
      items={data}
      columns={columns}
      tableLabeledBy={TABLE_CATEGORIES_ID}
      rowCustomRender={({
        row,
        item,
        rowProps,
      }: RowCustomRenderArgs<Category>) => (
        <Link
          key={item._id}
          to={`${routes.categories.root}/${item._id}`}
          {...rowProps}
        >
          {row}
        </Link>
      )}
    />
  );
};
