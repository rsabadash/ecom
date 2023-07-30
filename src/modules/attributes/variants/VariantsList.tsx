import { generatePath, Link } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import { routes } from '../../../common/constants/routes';
import { useCachedAPI } from '../../../common/hooks';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
} from '../../../components/Table';
import { TABLE_VARIANTS_ID } from './constants';
import { useVariantsTableColumns } from './hooks';
import { VariantWithAttribute } from './types';
import { VariantsListPlaceholder } from './VariantsListPlaceholder';

export const VariantsList = () => {
  const { data = [] } = useCachedAPI<VariantWithAttribute[]>(
    `${endpoints.attributes.variants}`,
  );

  const columns: TableColumnGeneric<VariantWithAttribute>[] =
    useVariantsTableColumns();

  return (
    <>
      {data.length > 0 ? (
        <Table
          items={data}
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
        />
      ) : (
        <VariantsListPlaceholder />
      )}
    </>
  );
};
