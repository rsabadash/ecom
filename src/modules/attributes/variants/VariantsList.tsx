import { FC } from 'react';
import { generatePath, Link } from 'react-router-dom';

import { routes } from '../../../common/constants/routes';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
} from '../../../components/Table';
import { TABLE_VARIANTS_ID } from './constants';
import { useVariantsTableColumns } from './hooks';
import { VariantsListProps, VariantWithAttribute } from './types';

export const VariantsList: FC<VariantsListProps> = ({ variants }) => {
  const columns: TableColumnGeneric<VariantWithAttribute>[] =
    useVariantsTableColumns();

  return (
    <Table
      items={variants}
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
  );
};
