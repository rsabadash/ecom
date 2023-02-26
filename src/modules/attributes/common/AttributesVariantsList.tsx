import { FC } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import {
  RowCustomRenderArgs,
  Table,
  TableColumnGeneric,
} from '../../../components/Table';
import { TABLE_VARIANTS_ID } from './constants';
import { AttributeVariant } from './types';
import { routes } from '../../../common/constants/routes';
import { useAttributeVariantsTableColumns } from './hooks';
import { AttributeUrlParams } from '../detail/types';

type AttributesVariantsListProps = {
  variants: AttributeVariant[];
  isDetailList: boolean;
};

export const AttributesVariantsList: FC<AttributesVariantsListProps> = ({
  variants,
  isDetailList,
}) => {
  const { attributeId } = useParams<AttributeUrlParams>();

  const columns: TableColumnGeneric<AttributeVariant>[] =
    useAttributeVariantsTableColumns(isDetailList);

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
      }: RowCustomRenderArgs<AttributeVariant>) => {
        const variantDetailPath = generatePath(
          routes.attributes.variantDetail,
          {
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
