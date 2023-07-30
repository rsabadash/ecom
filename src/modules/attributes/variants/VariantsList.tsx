import { generatePath, Link } from 'react-router-dom';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
} from '../../../components/Table';
import { TABLE_VARIANTS_ID } from './constants';
import { VariantWithAttribute } from './types';
import { routes } from '../../../common/constants/routes';
import { useVariantsTableColumns } from './hooks';
import { VariantsListPlaceholder } from './VariantsListPlaceholder';
import { useCachedAPI } from '../../../hooks';
import { endpoints } from '../../../common/constants/api';

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
