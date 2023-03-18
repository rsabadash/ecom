import { FC } from 'react';
import { generatePath, Link } from 'react-router-dom';
import {
  RowCustomRenderArgs,
  Table,
  TableColumnGeneric,
} from '../../../components/Table';
import { TABLE_VARIANTS_ID } from './constants';
import { VariantsListProps, VariantWithAttribute } from './types';
import { routes } from '../../../common/constants/routes';
import { useVariantsTableColumns } from './hooks';

export const VariantsList: FC<VariantsListProps> = ({ variants }) => {
  const columns: TableColumnGeneric<VariantWithAttribute>[] =
    useVariantsTableColumns();

  return (
    <Table
      isRowLinkInteractive
      items={variants}
      columns={columns}
      tableRowRenderKey="variantId"
      tableLabeledBy={TABLE_VARIANTS_ID}
      rowCustomRender={({
        row,
        item,
        rowProps,
      }: RowCustomRenderArgs<VariantWithAttribute>) => {
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
