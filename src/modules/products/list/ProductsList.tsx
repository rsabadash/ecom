import { endpoints } from '../../../common/constants/api';
import { useCachedPaginationAPI } from '../../../common/hooks';
import { usePaginationLimit } from '../../../components/Pagination/hooks';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
  TablePagination,
} from '../../../components/Table';
import { TABLE_ROLES } from '../../../components/Table/constants';
import { Product } from '../common/types';
import { TABLE_PRODUCTS_ID } from './constants';
import { useProductsTableColumns } from './hooks';
import { ProductsListItem } from './ProductsListItem';
import { ProductsListPlaceholder } from './ProductsListPlaceholder';
import { ProductTable } from './types';

import classes from './styles/index.module.css';

export const ProductsList = () => {
  const { limitValue, setLimitValue } = usePaginationLimit();

  const { list, total } = useCachedPaginationAPI<Product>(
    endpoints.products.root,
    {
      limit: limitValue,
    },
  );

  const columns: TableColumnGeneric<ProductTable>[] = useProductsTableColumns();

  return (
    <>
      {list.length > 0 ? (
        <Table
          items={list}
          columns={columns}
          tableRole={TABLE_ROLES.TREEGRID}
          tableLabeledBy={TABLE_PRODUCTS_ID}
          tableBodyClassName={classes.warehouseList}
          rowCustomRender={({
            row,
            item,
            rowProps,
          }: RowCustomRenderProps<Product>) => (
            <ProductsListItem key={item._id} item={item} rowProps={rowProps}>
              {row}
            </ProductsListItem>
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
        <ProductsListPlaceholder />
      )}
    </>
  );
};
