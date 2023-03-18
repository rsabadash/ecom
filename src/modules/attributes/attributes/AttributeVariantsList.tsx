import { FC } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import {
  RowCustomRenderArgs,
  Table,
  TableColumnGeneric,
} from '../../../components/Table';
import { TABLE_ATTRIBUTE_VARIANTS_ID } from './constants';
import { AttributesVariantsListProps, AttributeUrlParams } from './types';
import { routes } from '../../../common/constants/routes';
import { useAttributeVariantsTableColumns } from './hooks';
import { Variant } from '../variants/types';

export const AttributeVariantsList: FC<AttributesVariantsListProps> = ({
  variants,
}) => {
  const { attributeId } = useParams<AttributeUrlParams>();

  const columns: TableColumnGeneric<Variant>[] =
    useAttributeVariantsTableColumns();

  return (
    <Table
      items={variants}
      columns={columns}
      tableRowRenderKey="variantId"
      tableLabeledBy={TABLE_ATTRIBUTE_VARIANTS_ID}
      rowCustomRender={({
        row,
        item,
        rowProps,
      }: RowCustomRenderArgs<Variant>) => {
        const variantDetailPath = generatePath(
          routes.attributes.variantDetail,
          {
            attributeId: attributeId,
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
