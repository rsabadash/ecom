import { generatePath, Link } from 'react-router-dom';

import { endpoints } from '../../../../common/constants/api';
import { routes } from '../../../../common/constants/routes';
import { useCachedPaginationAPI } from '../../../../common/hooks';
import { usePaginationLimit } from '../../../../components/Pagination/hooks';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
  TablePagination,
} from '../../../../components/Table';
import { useVariantsTableColumns } from '../add/hooks';
import { VariantWithAttribute } from '../add/types';
import { TABLE_VARIANTS_ID } from './constants';
import { VariantsListPlaceholder } from './VariantsListPlaceholder';

export const VariantsList = () => {
  const { limitValue, setLimitValue } = usePaginationLimit();

  const { list, total } = useCachedPaginationAPI<VariantWithAttribute>({
    url: endpoints.attributes.variants,
    limit: limitValue,
  });

  const columns: TableColumnGeneric<VariantWithAttribute>[] =
    useVariantsTableColumns();

  return (
    <>
      {list.length > 0 ? (
        <Table
          items={list}
          columns={columns}
          tableRowRenderKey="variantId"
          tableLabeledBy={TABLE_VARIANTS_ID}
          rowCustomRender={({
            row,
            item,
            rowProps,
          }: RowCustomRenderProps<VariantWithAttribute>) => {
            const variantDetailPath = generatePath(
              routes.attributes.variantDetail,
              {
                attributeId: item.attributeId,
                variantId: item.variantId,
              },
            );

            return (
              <Link key={item.variantId} to={variantDetailPath} {...rowProps}>
                {row}
              </Link>
            );
          }}
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
        <VariantsListPlaceholder />
      )}
    </>
  );
};
