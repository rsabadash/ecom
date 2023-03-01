import { FC } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import {
  RowCustomRenderArgs,
  Table,
  TableColumnGeneric,
} from '../../../components/Table';
import { TABLE_VARIANTS_ID } from './constants';
import { VariantsListProps, Variant } from './types';
import { routes } from '../../../common/constants/routes';
import { useVariantsTableColumns } from './hooks';
import { AttributeUrlParams } from '../detail/types';

export const VariantsList: FC<VariantsListProps> = ({
  variants,
  isDetailList,
}) => {
  const { attributeId } = useParams<AttributeUrlParams>();

  const columns: TableColumnGeneric<Variant>[] =
    useVariantsTableColumns(isDetailList);

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
      }: RowCustomRenderArgs<Variant>) => {
        const variantDetailPath = generatePath(
          routes.attributes.variantDetail,
          {
            // on the general list we have the ID in response
            // on the attribute detail we have the ID only in the URL
            attributeId: item.attributeId || attributeId,
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
