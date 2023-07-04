import { Link } from 'react-router-dom';

import { endpoints } from '../../common/constants/api';
import { routes } from '../../common/constants/routes';
import { useCachedAPI } from '../../common/hooks';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
} from '../../components/Table';
import { TABLE_CATEGORIES_ID } from './constants';
import { useCategoriesTableColumns } from './hooks';
import { Category } from './types';

export const CategoriesList = () => {
  const { data = [] } = useCachedAPI<Category[]>(endpoints.categories.root);

  const columns: TableColumnGeneric<Category>[] = useCategoriesTableColumns();

  return (
    <Table
      items={data}
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
    />
  );
};
